import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DroppedTransactionsInitializer } from "cdk-alchemy-webhooks";

interface DroppedTransactionsStackProps extends cdk.StackProps {
	alchemyApiKey: string;
	alchemyAuthToken: string;
	alchemyAppId: string;
}

export class DroppedTransactionsStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: DroppedTransactionsStackProps) {
		super(scope, id, props);

		new DroppedTransactionsInitializer(this, "DroppedTransactionsExample", {
			alchemyApiKey: props.alchemyApiKey,
			alchemyNetwork: "eth-mainnet",
			alchemyAuthToken: props.alchemyAuthToken,
			alchemyWebhookDestinationUrl: "https://www.google.com",
			alchemyAppId: props.alchemyAppId
		});
	}
}
