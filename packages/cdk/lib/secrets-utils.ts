import { SecretsManager } from "@aws-sdk/client-secrets-manager";

interface AlchemySecretObject {
    WebhookId: string,
    WebhookSigningKey: string,
}
async function storeSecret(path: string, alchemySecretObject: AlchemySecretObject) {
    const secretManager = new SecretsManager({});
    await secretManager.createSecret({
        Name: path,
        SecretString: JSON.stringify(alchemySecretObject)
    })
}

export { AlchemySecretObject, storeSecret }
