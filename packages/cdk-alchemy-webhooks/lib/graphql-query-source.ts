import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Stack } from "aws-cdk-lib";

export enum GraphqlQuerySourceType {
	PLAIN = "plain",
	SSM = "ssm"
}

export interface IGraphqlQuerySource {
	readonly sourceType: GraphqlQuerySourceType;
	readonly value: string;
}

export class GraphqlQuerySource implements IGraphqlQuerySource {
	public readonly sourceType: GraphqlQuerySourceType;
	public readonly value: string;

	private constructor(sourceType: GraphqlQuerySourceType, value: string) {
		this.sourceType = sourceType;
		this.value = value;
	}

	static fromPlainText(query: string): GraphqlQuerySource {
		return new GraphqlQuerySource(GraphqlQuerySourceType.PLAIN, query);
	}

	static fromSsmParameter(parameterName: string): GraphqlQuerySource {
		return new GraphqlQuerySource(GraphqlQuerySourceType.SSM, parameterName);
	}
}

export function resolveGraphqlQueryConfig(prop: string | IGraphqlQuerySource): IGraphqlQuerySource {
	if (typeof prop === "string") {
		return { sourceType: GraphqlQuerySourceType.PLAIN, value: prop };
	}
	return prop;
}

export function configureGraphqlQueryEnv(source: IGraphqlQuerySource): Record<string, string> {
	return {
		GRAPHQL_QUERY_SOURCE: source.sourceType,
		GRAPHQL_QUERY_VALUE: source.value
	};
}

export function grantGraphqlQueryRead(fn: NodejsFunction, source: IGraphqlQuerySource): void {
	if (source.sourceType === GraphqlQuerySourceType.SSM) {
		const paramArn = source.value.startsWith("arn:")
			? source.value
			: Stack.of(fn).formatArn({
				service: "ssm",
				resource: "parameter",
				resourceName: source.value.startsWith("/") ? source.value.slice(1) : source.value
			});

		fn.addToRolePolicy(
			new PolicyStatement({
				effect: Effect.ALLOW,
				actions: ["ssm:GetParameter"],
				resources: [paramArn]
			})
		);
	}
}
