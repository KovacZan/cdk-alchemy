import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { CustomResource, Duration } from "aws-cdk-lib";
import { Network } from "alchemy-sdk";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Provider } from "aws-cdk-lib/custom-resources";

export interface CustomWebhookProps {
	alchemyApiKey: string;
	alchemyNetwork: Network | string;
	alchemyAuthToken: string;
	alchemyWebhookDestinationUrl: string;
	alchemyGraphqlQuery: string;
	alchemyWebhookName?: string;
}

export class CustomWebhook extends Construct {
	public readonly webhookId: string;

	constructor(scope: Construct, id: string, props: CustomWebhookProps) {
		super(scope, id);

		const handler = new NodejsFunction(this, "CustomWebhookHandler", {
			entry: path.resolve(__dirname, "CustomWebhook.lambda.js"),
			description: "Custom Resource handler for Custom GraphQL Alchemy Webhook",
			timeout: Duration.minutes(15),
			runtime: Runtime.NODEJS_22_X,
			environment: {
				ALCHEMY_API_KEY: props.alchemyApiKey,
				ALCHEMY_AUTH_TOKEN: props.alchemyAuthToken
			}
		});

		const provider = new Provider(this, "CustomWebhookProvider", {
			onEventHandler: handler
		});

		const resource = new CustomResource(this, "CustomWebhookResource", {
			serviceToken: provider.serviceToken,
			properties: {
				network: props.alchemyNetwork,
				destinationUrl: props.alchemyWebhookDestinationUrl,
				graphqlQuery: props.alchemyGraphqlQuery,
				webhookName: props.alchemyWebhookName || ""
			}
		});

		this.webhookId = resource.getAttString("WebhookId");
	}
}
