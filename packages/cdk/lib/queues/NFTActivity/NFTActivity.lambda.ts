import { Network, WebhookType } from "alchemy-sdk";
import { getSSMParameterByName } from "../../ssm-utils";
import { checkNetworkValidity, initAlchemy } from "../../alchemy-utils";
import { getSecret } from "../../secrets-utils";
import { SQSHandler } from "aws-lambda";

interface NFTActivityRecord {
	filterType: "ADD" | "REMOVE";
	filters: {
		contractAddress: string;
		tokenId: string;
	}[];
}
const handler: SQSHandler = async event => {
	const apiKey = process.env.ALCHEMY_API_KEY;
	const network = process.env.ALCHEMY_NETWORK as Network;
	const authToken = process.env.ALCHEMY_AUTH_TOKEN;

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
	const alchemyInstance = initAlchemy(network, apiKey, authToken);

	const path = await getSSMParameterByName(process.env.SSM_PATH_TO_SECRET!);
	const secret = await getSecret(path);

	for (const record of event.Records) {
		// TODO: TRY CATCH
		const nftActivityRecord: NFTActivityRecord = JSON.parse(record.body);

		const webhooks = await alchemyInstance.notify.getAllWebhooks();
		const webhookInstance = webhooks.webhooks.find(
			webhook =>
				webhook.network === Network.ETH_MAINNET &&
				webhook.type === WebhookType.NFT_ACTIVITY &&
				webhook.id === secret.WebhookId
		);

		if (!webhookInstance) {
			throw new Error("There is no webhook that matches this secret!");
		}

		if (nftActivityRecord.filterType === "ADD") {
			await alchemyInstance.notify.updateWebhook(webhookInstance.id, {
				addFilters: nftActivityRecord.filters
			});
		} else if (nftActivityRecord.filterType === "REMOVE") {
			await alchemyInstance.notify.updateWebhook(webhookInstance.id, {
				removeFilters: nftActivityRecord.filters
			});
		} else {
			throw new Error("Filter type not supported");
		}
	}
};

export { handler };
