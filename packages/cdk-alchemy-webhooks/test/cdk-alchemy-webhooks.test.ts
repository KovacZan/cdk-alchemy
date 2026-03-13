import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import { Network } from "alchemy-sdk";
import { CustomWebhook } from "../lib/registers/CustomWebhook";
import { GraphqlQuerySource } from "../lib/graphql-query-source";

test("CDK Alchemy webhooks", () => {
	const app = new cdk.App();
	const _stack = new cdk.Stack(app, "TestStack");
});

test("CustomWebhook with plain string graphqlQuery sets env vars", () => {
	const app = new cdk.App();
	const stack = new cdk.Stack(app, "TestStack");

	new CustomWebhook(stack, "TestWebhook", {
		alchemyApiKey: "test-api-key",
		alchemyNetwork: Network.ETH_MAINNET,
		alchemyAuthToken: "test-auth-token",
		alchemyWebhookDestinationUrl: "https://example.com/webhook",
		alchemyGraphqlQuery: "{ block { number } }"
	});

	const template = Template.fromStack(stack);
	template.hasResourceProperties("AWS::Lambda::Function", {
		Environment: {
			Variables: Match.objectLike({
				GRAPHQL_QUERY_SOURCE: "plain",
				GRAPHQL_QUERY_VALUE: "{ block { number } }"
			})
		}
	});
});

test("CustomWebhook with GraphqlQuerySource.fromPlainText sets env vars", () => {
	const app = new cdk.App();
	const stack = new cdk.Stack(app, "TestStack");

	new CustomWebhook(stack, "TestWebhook", {
		alchemyApiKey: "test-api-key",
		alchemyNetwork: Network.ETH_MAINNET,
		alchemyAuthToken: "test-auth-token",
		alchemyWebhookDestinationUrl: "https://example.com/webhook",
		alchemyGraphqlQuery: GraphqlQuerySource.fromPlainText("{ block { number } }")
	});

	const template = Template.fromStack(stack);
	template.hasResourceProperties("AWS::Lambda::Function", {
		Environment: {
			Variables: Match.objectLike({
				GRAPHQL_QUERY_SOURCE: "plain",
				GRAPHQL_QUERY_VALUE: "{ block { number } }"
			})
		}
	});
});

test("CustomWebhook with GraphqlQuerySource.fromSsmParameter sets env vars and IAM policy", () => {
	const app = new cdk.App();
	const stack = new cdk.Stack(app, "TestStack");

	new CustomWebhook(stack, "TestWebhook", {
		alchemyApiKey: "test-api-key",
		alchemyNetwork: Network.ETH_MAINNET,
		alchemyAuthToken: "test-auth-token",
		alchemyWebhookDestinationUrl: "https://example.com/webhook",
		alchemyGraphqlQuery: GraphqlQuerySource.fromSsmParameter("/my/graphql-query")
	});

	const template = Template.fromStack(stack);
	template.hasResourceProperties("AWS::Lambda::Function", {
		Environment: {
			Variables: Match.objectLike({
				GRAPHQL_QUERY_SOURCE: "ssm",
				GRAPHQL_QUERY_VALUE: "/my/graphql-query"
			})
		}
	});

	template.hasResourceProperties("AWS::IAM::Policy", {
		PolicyDocument: {
			Statement: Match.arrayWith([
				Match.objectLike({
					Action: "ssm:GetParameter",
					Effect: "Allow",
					Resource: {
						"Fn::Join": Match.arrayWith([
							Match.arrayWith([
								Match.stringLikeRegexp(".*parameter/my/graphql-query$")
							])
						])
					}
				})
			])
		}
	});
});
