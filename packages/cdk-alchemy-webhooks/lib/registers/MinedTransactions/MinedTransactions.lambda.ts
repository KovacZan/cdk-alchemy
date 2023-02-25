import { Network, WebhookType } from "alchemy-sdk";
import { checkAppIdValidity, checkNetworkValidity, initAlchemy } from "../../alchemy-utils";
import { urlValidity } from "../../utils";
import { MinedTransactionWebhook } from "alchemy-sdk/dist/src/types/types";
import { getSSMParameterByName } from "../../ssm-utils";
import { storeSecret } from "../../secrets-utils";

const handler = async () => {
	const appId = process.env.ALCHEMY_APP_ID;
	const apiKey = process.env.ALCHEMY_API_KEY;
	const network = process.env.ALCHEMY_NETWORK as Network;
	const authToken = process.env.ALCHEMY_AUTH_TOKEN;

	const destinationUrl = process.env.ALCHEMY_WEBHOOK_DESTINATION_URL;

	checkAppIdValidity(appId);
	checkNetworkValidity(network, Object.values(Network));
	urlValidity(destinationUrl);

	const alchemyInstance = initAlchemy(network, apiKey, authToken);

	const webhooks = await alchemyInstance.notify.getAllWebhooks();
	const isAlreadyCreated = webhooks.webhooks.some(
		webhook =>
			webhook.url === destinationUrl &&
			webhook.network === network &&
			webhook.type === WebhookType.MINED_TRANSACTION
	);

	if (isAlreadyCreated) {
		console.log("Webhook for this destination already created");
	} else {
		const response: MinedTransactionWebhook = await alchemyInstance.notify
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			.createWebhook(destinationUrl, WebhookType.MINED_TRANSACTION, {
				appId
			});
		const path = await getSSMParameterByName(process.env.SSM_PATH_TO_SECRET!);

		await storeSecret(path, {
			WebhookId: response.id,
			WebhookSigningKey: response.signingKey
		});
	}
};

export { handler };
