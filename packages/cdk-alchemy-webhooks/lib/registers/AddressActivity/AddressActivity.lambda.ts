import { Network, WebhookType } from "alchemy-sdk";
import { checkNetworkValidity, initAlchemy } from "../../alchemy-utils";
import { urlValidity } from "../../utils";
import { getSSMParameterByName } from "../../ssm-utils";
import { storeSecret } from "../../secrets-utils";

const handler = async () => {
	const apiKey = process.env.ALCHEMY_API_KEY;
	const network = process.env.ALCHEMY_NETWORK as Network;
	const authToken = process.env.ALCHEMY_AUTH_TOKEN;

	const destinationUrl = process.env.ALCHEMY_WEBHOOK_DESTINATION_URL!;
	const contractAddress = process.env.ALCHEMY_CONTRACT_ADDRESS || ""; // TODO: add fake

	checkNetworkValidity(network, [
		Network.ETH_MAINNET,
		Network.ETH_GOERLI,
		Network.MATIC_MAINNET,
		Network.MATIC_MUMBAI,
		Network.ARB_MAINNET,
		Network.ARB_GOERLI,
		Network.OPT_MAINNET,
		Network.OPT_GOERLI
	]);
	urlValidity(destinationUrl);
	const alchemyInstance = initAlchemy(network, apiKey, authToken);

	const webhooks = await alchemyInstance.notify.getAllWebhooks();
	const isAlreadyCreated = webhooks.webhooks.some(
		webhook =>
			webhook.url === destinationUrl &&
			webhook.network === network &&
			webhook.type === WebhookType.ADDRESS_ACTIVITY
	);

	if (isAlreadyCreated) {
		console.log("Webhook for this destination and type already created");
	} else {
		const response = await alchemyInstance.notify.createWebhook(destinationUrl, WebhookType.ADDRESS_ACTIVITY, {
			addresses: [contractAddress]
		});

		const path = await getSSMParameterByName(process.env.SSM_PATH_TO_SECRET!);

		await storeSecret(path, {
			WebhookId: response.id,
			WebhookSigningKey: response.signingKey
		});
	}
};

export { handler };
