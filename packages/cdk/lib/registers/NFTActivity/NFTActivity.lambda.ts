import { Alchemy, Network, WebhookType } from "alchemy-sdk";

const handler = async () => {
    // TODO: add validation
    const apiKey = process.env.ALCHEMY_API_KEY;
    const network = process.env.ALCHEMY_NETWORK as Network;
    const authToken = process.env.ALCHEMY_AUTH_TOKEN;

    const destinationUrl = process.env.ALCHEMY_WEBHOOK_DESTINATION_URL;
    const contractAddress = process.env.ALCHEMY_CONTRACT_ADDRESS || "";
    const tokenId = process.env.ALCHEMY_TOKEN_ID || "";

    if (!destinationUrl) { // TODO: check if valid url
        throw new Error("Webhook Destination URL not provided!")
    }

    const alchemyInstance = new Alchemy({
        apiKey,
        network,
        authToken,
    });

    const webhooks = await alchemyInstance.notify.getAllWebhooks()
    const isAlreadyCreated = webhooks.webhooks.some(webhook =>
        webhook.url === destinationUrl &&
        webhook.network === Network.ETH_MAINNET
    );

    if (isAlreadyCreated) {
        console.log("Webhook for this destination already created")
    } else {
        const response = await alchemyInstance.notify.createWebhook(destinationUrl, WebhookType.NFT_ACTIVITY, {
            filters: [
                {
                    contractAddress,
                    tokenId
                }
            ]
        });
        console.log(response) // TODO: store id and signing key to secret manager
    }

}

export { handler }
