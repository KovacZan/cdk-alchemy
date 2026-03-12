import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const ssmClient = new SSMClient({});
const smClient = new SecretsManagerClient({});

const cache = new Map<string, string>();

export async function resolveCredential(envPrefix: string): Promise<string> {
	const cached = cache.get(envPrefix);
	if (cached !== undefined) {
		return cached;
	}

	const source = process.env[`${envPrefix}_SOURCE`];
	const value = process.env[`${envPrefix}_VALUE`];

	if (!source || !value) {
		throw new Error(`Missing credential environment variables: ${envPrefix}_SOURCE and/or ${envPrefix}_VALUE`);
	}

	let resolved: string;

	switch (source) {
		case "plain":
			resolved = value;
			break;

		case "ssm": {
			const response = await ssmClient.send(
				new GetParameterCommand({
					Name: value,
					WithDecryption: true
				})
			);
			if (!response.Parameter?.Value) {
				throw new Error(`SSM parameter ${value} has no value`);
			}
			resolved = response.Parameter.Value;
			break;
		}

		case "secretsmanager": {
			const response = await smClient.send(
				new GetSecretValueCommand({
					SecretId: value
				})
			);
			if (!response.SecretString) {
				throw new Error(`Secret ${value} has no string value`);
			}
			resolved = response.SecretString;
			break;
		}

		default:
			throw new Error(`Unknown credential source type: ${source}`);
	}

	cache.set(envPrefix, resolved);
	return resolved;
}
