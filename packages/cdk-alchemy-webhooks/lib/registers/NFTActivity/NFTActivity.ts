import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { CustomResource, Duration } from "aws-cdk-lib";
import { BigNumber, Network } from "alchemy-sdk";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Provider } from "aws-cdk-lib/custom-resources";

export interface NFTActivityProps {
	alchemyApiKey: string;
	alchemyNetwork: Network | string;
	alchemyAuthToken: string;
	alchemyWebhookDestinationUrl: string;
	alchemyContractAddress?: string;
	alchemyTokenId?: string | number | BigNumber;
}

export class NFTActivityWebhook extends Construct {
	public readonly webhookId: string;

	constructor(scope: Construct, id: string, props: NFTActivityProps) {
		super(scope, id);

		const handler = new NodejsFunction(this, "NFTActivityHandler", {
			entry: path.resolve(__dirname, "NFTActivity.lambda.js"),
			description: "Custom Resource handler for NFT Activity Alchemy Webhook",
			timeout: Duration.minutes(15),
			runtime: Runtime.NODEJS_18_X,
			environment: {
				ALCHEMY_API_KEY: props.alchemyApiKey,
				ALCHEMY_AUTH_TOKEN: props.alchemyAuthToken
			}
		});

		const provider = new Provider(this, "NFTActivityProvider", {
			onEventHandler: handler
		});

		const resource = new CustomResource(this, "NFTActivityResource", {
			serviceToken: provider.serviceToken,
			properties: {
				network: props.alchemyNetwork,
				destinationUrl: props.alchemyWebhookDestinationUrl,
				contractAddress: props.alchemyContractAddress || "",
				tokenId: props.alchemyTokenId?.toString() || ""
			}
		});

		this.webhookId = resource.getAttString("WebhookId");
	}
}
