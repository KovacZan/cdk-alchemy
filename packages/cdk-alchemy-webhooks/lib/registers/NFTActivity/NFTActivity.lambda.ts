import { CdkCustomResourceEvent, CdkCustomResourceResponse } from "aws-lambda";
import { Network } from "alchemy-sdk";
import { checkNetworkValidity, initAlchemy } from "../../alchemy-utils";
import { isValidURL } from "../../utils";
import { resolveCredential } from "../../credential-resolver";

/**
 * Converts SDK network format (e.g. "eth-mainnet") to the webhook API format (e.g. "ETH_MAINNET").
 */
function toWebhookNetwork(network: Network): string {
	return network.replace(/-/g, "_").toUpperCase();
}

const VALID_NETWORKS = [
	Network.ETH_MAINNET,
	Network.ETH_GOERLI,
	Network.ETH_SEPOLIA,
	Network.OPT_MAINNET,
	Network.OPT_GOERLI,
	Network.OPT_SEPOLIA,
	Network.ARB_MAINNET,
	Network.ARB_GOERLI,
	Network.ARB_SEPOLIA,
	Network.MATIC_MAINNET,
	Network.MATIC_MUMBAI,
	Network.ASTAR_MAINNET,
	Network.POLYGONZKEVM_MAINNET,
	Network.POLYGONZKEVM_TESTNET,
	Network.BASE_MAINNET,
	Network.BASE_GOERLI,
	Network.BASE_SEPOLIA
];

async function createWebhook(
	apiKey: string,
	authToken: string,
	network: Network,
	destinationUrl: string,
	contractAddress: string,
	tokenId: string,
	webhookName: string
): Promise<CdkCustomResourceResponse> {
	checkNetworkValidity(network, VALID_NETWORKS);
	if (!isValidURL(destinationUrl)) {
		throw new Error("destinationUrl is not a valid URL");
	}

	const body: Record<string, unknown> = {
		network: toWebhookNetwork(network),
		webhook_type: "NFT_ACTIVITY",
		webhook_url: destinationUrl
	};
	if (webhookName) {
		body.name = webhookName;
	}
	if (contractAddress || tokenId) {
		body.nft_filters = [
			{
				contract_address: contractAddress,
				token_id: tokenId
			}
		];
	}

	const response = await fetch("https://dashboard.alchemy.com/api/create-webhook", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Alchemy-Token": authToken
		},
		body: JSON.stringify(body)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error(`Failed to create webhook: ${response.status} ${errorText}`);
	}

	const result = (await response.json()) as { data: { id: string } };
	const webhookId = result.data.id;

	console.log(`Webhook created: ${webhookId}`);
	return {
		PhysicalResourceId: webhookId,
		Data: { WebhookId: webhookId }
	};
}

async function deleteWebhook(apiKey: string, authToken: string, network: Network, webhookId: string): Promise<void> {
	try {
		const alchemy = initAlchemy(network, apiKey, authToken);
		await alchemy.notify.deleteWebhook(webhookId);
		console.log(`Webhook deleted: ${webhookId}`);
	} catch (err) {
		console.log(`Failed to delete webhook ${webhookId}, it may already be gone: ${err}`);
	}
}

const handler = async (event: CdkCustomResourceEvent): Promise<CdkCustomResourceResponse> => {
	const apiKey = await resolveCredential("ALCHEMY_API_KEY");
	const authToken = await resolveCredential("ALCHEMY_AUTH_TOKEN");

	const network = event.ResourceProperties.network as Network;
	const destinationUrl = event.ResourceProperties.destinationUrl as string;
	const contractAddress = (event.ResourceProperties.contractAddress as string) || "";
	const tokenId = (event.ResourceProperties.tokenId as string) || "";
	const webhookName = (event.ResourceProperties.webhookName as string) || "";

	switch (event.RequestType) {
		case "Create":
			return createWebhook(apiKey, authToken, network, destinationUrl, contractAddress, tokenId, webhookName);

		case "Update":
			await deleteWebhook(apiKey, authToken, network, event.PhysicalResourceId);
			return createWebhook(apiKey, authToken, network, destinationUrl, contractAddress, tokenId, webhookName);

		case "Delete":
			await deleteWebhook(apiKey, authToken, network, event.PhysicalResourceId);
			return { PhysicalResourceId: event.PhysicalResourceId };

		default:
			throw new Error(`Unknown request type: ${(event as CdkCustomResourceEvent).RequestType}`);
	}
};

export { handler };
