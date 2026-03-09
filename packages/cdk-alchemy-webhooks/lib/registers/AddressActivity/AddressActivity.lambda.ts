import { CdkCustomResourceEvent, CdkCustomResourceResponse } from "aws-lambda";
import { Network, WebhookType } from "alchemy-sdk";
import { checkNetworkValidity, initAlchemy } from "../../alchemy-utils";
import { isValidURL } from "../../utils";

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
	contractAddress: string
): Promise<CdkCustomResourceResponse> {
	checkNetworkValidity(network, VALID_NETWORKS);
	if (!isValidURL(destinationUrl)) {
		throw new Error("destinationUrl is not a valid URL");
	}

	const alchemy = initAlchemy(network, apiKey, authToken);
	const webhook = await alchemy.notify.createWebhook(destinationUrl, WebhookType.ADDRESS_ACTIVITY, {
		addresses: contractAddress ? [contractAddress] : []
	});

	console.log(`Webhook created: ${webhook.id}`);
	return {
		PhysicalResourceId: webhook.id,
		Data: { WebhookId: webhook.id }
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
	const apiKey = process.env.ALCHEMY_API_KEY!;
	const authToken = process.env.ALCHEMY_AUTH_TOKEN!;

	const network = event.ResourceProperties.network as Network;
	const destinationUrl = event.ResourceProperties.destinationUrl as string;
	const contractAddress = (event.ResourceProperties.contractAddress as string) || "";

	switch (event.RequestType) {
		case "Create":
			return createWebhook(apiKey, authToken, network, destinationUrl, contractAddress);

		case "Update":
			await deleteWebhook(apiKey, authToken, network, event.PhysicalResourceId);
			return createWebhook(apiKey, authToken, network, destinationUrl, contractAddress);

		case "Delete":
			await deleteWebhook(apiKey, authToken, network, event.PhysicalResourceId);
			return { PhysicalResourceId: event.PhysicalResourceId };

		default:
			throw new Error(`Unknown request type: ${(event as CdkCustomResourceEvent).RequestType}`);
	}
};

export { handler };
