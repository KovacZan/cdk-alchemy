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

async function getSecret(path: string) {
    const secretManager = new SecretsManager({});
    const secrets = await secretManager.getSecretValue({
        SecretId: path,
    })
    if (!secrets.SecretString) {
        throw new Error("Secret doesn't exists!")
    }
    return JSON.parse(secrets.SecretString) as AlchemySecretObject
}

export { AlchemySecretObject, storeSecret, getSecret }
