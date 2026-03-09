import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { CustomResource, Duration } from "aws-cdk-lib";
import { Network } from "alchemy-sdk";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Provider } from "aws-cdk-lib/custom-resources";

export interface AddressActivityProps {
	alchemyApiKey: string;
	alchemyNetwork: Network | string;
	alchemyAuthToken: string;
	alchemyWebhookDestinationUrl: string;
	alchemyContractAddress?: string;
}

export class AddressActivityWebhook extends Construct {
	public readonly webhookId: string;

	constructor(scope: Construct, id: string, props: AddressActivityProps) {
		super(scope, id);

		const handler = new NodejsFunction(this, "AddressActivityHandler", {
			entry: path.resolve(__dirname, "AddressActivity.lambda.js"),
			description: "Custom Resource handler for Address Activity Alchemy Webhook",
			timeout: Duration.minutes(15),
			runtime: Runtime.NODEJS_18_X,
			environment: {
				ALCHEMY_API_KEY: props.alchemyApiKey,
				ALCHEMY_AUTH_TOKEN: props.alchemyAuthToken
			}
		});

		const provider = new Provider(this, "AddressActivityProvider", {
			onEventHandler: handler
		});

		const resource = new CustomResource(this, "AddressActivityResource", {
			serviceToken: provider.serviceToken,
			properties: {
				network: props.alchemyNetwork,
				destinationUrl: props.alchemyWebhookDestinationUrl,
				contractAddress: props.alchemyContractAddress || ""
			}
		});

		this.webhookId = resource.getAttString("WebhookId");
	}
}
