import { Alchemy, Network, WebhookType } from "alchemy-sdk";
import { SecretsManager } from "@aws-sdk/client-secrets-manager";
import { getSSMParameterByName } from "../../ssm-utils";
import { isValidURL } from "../../utils";

const handler = async () => {
    const apiKey = process.env.ALCHEMY_API_KEY;
    const network = process.env.ALCHEMY_NETWORK as Network;
    const authToken = process.env.ALCHEMY_AUTH_TOKEN;

    const destinationUrl = process.env.ALCHEMY_WEBHOOK_DESTINATION_URL;
    const contractAddress = process.env.ALCHEMY_CONTRACT_ADDRESS || ""; // TODO: create fake init
    const tokenId = process.env.ALCHEMY_TOKEN_ID || ""; // TODO: create fake init

    if (!apiKey) {
        throw new Error("API KEY not provided!");
    }

    if (!network) {
        throw new Error("Network not provided!");
    }
    if (network !== Network.ETH_MAINNET && network !== Network.ETH_GOERLI) {
        throw new Error("Network not supported");
    }

    if (!authToken) {
        throw new Error("Auth Token not provided")
    }

    if (!destinationUrl) {
        throw new Error("Webhook Destination URL not provided!")
    }
    if (!isValidURL(destinationUrl)) {
        throw new Error("Invalid http or https Destination URL!")
    }

    const alchemyInstance = new Alchemy({
        apiKey,
        network,
        authToken,
    });

    const webhooks = await alchemyInstance.notify.getAllWebhooks()
    const isAlreadyCreated = webhooks.webhooks.some(webhook =>
        webhook.url === destinationUrl &&
        webhook.network === Network.ETH_MAINNET &&
        webhook.type === WebhookType.NFT_ACTIVITY
    );

    if (isAlreadyCreated) {
        console.log("Webhook for this destination already created!")
    } else {
        const response = await alchemyInstance.notify.createWebhook(destinationUrl, WebhookType.NFT_ACTIVITY, {
            filters: [
                {
                    contractAddress,
                    tokenId
                }
            ]
        });

        const secret = {
            WebhookId: response.id,
            WebhookSigningKey: response.signingKey,
        }

        const path = await getSSMParameterByName(process.env.SSM_PATH_TO_SECRET!);

        const secretManager = new SecretsManager({});
        await secretManager.createSecret({
            Name: path,
            SecretString: JSON.stringify(secret)
        })
    }

}

export { handler }
