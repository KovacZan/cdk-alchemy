import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const ssmClient = new SSMClient({});

const cache = new Map<string, string>();

export async function resolveGraphqlQuery(): Promise<string> {
	const cacheKey = "GRAPHQL_QUERY";
	const cached = cache.get(cacheKey);
	if (cached !== undefined) {
		return cached;
	}

	const source = process.env.GRAPHQL_QUERY_SOURCE;
	const value = process.env.GRAPHQL_QUERY_VALUE;

	if (!source || !value) {
		throw new Error("Missing environment variables: GRAPHQL_QUERY_SOURCE and/or GRAPHQL_QUERY_VALUE");
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

		default:
			throw new Error(`Unknown GraphQL query source type: ${source}`);
	}

	cache.set(cacheKey, resolved);
	return resolved;
}
