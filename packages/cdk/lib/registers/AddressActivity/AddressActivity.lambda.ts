import { Alchemy, Network, WebhookType } from "alchemy-sdk";

const handler = async () => {
    // TODO: add validation
    const apiKey = process.env.ALCHEMY_API_KEY;
    const network = process.env.ALCHEMY_NETWORK as Network;
    const authToken = process.env.ALCHEMY_AUTH_TOKEN;

    const destinationUrl = process.env.ALCHEMY_WEBHOOK_DESTINATION_URL;
    const contractAddress = process.env.ALCHEMY_CONTRACT_ADDRESS || "";

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
        webhook.network === network &&
        webhook.type === WebhookType.ADDRESS_ACTIVITY
    );

    if (isAlreadyCreated) {
        console.log("Webhook for this destination already created")
    } else {
        const response = await alchemyInstance.notify.createWebhook(destinationUrl, WebhookType.ADDRESS_ACTIVITY, {
            addresses: [contractAddress]
        });
        console.log(response) // TODO: store id and signing key to secret manager
    }

}

export { handler }
