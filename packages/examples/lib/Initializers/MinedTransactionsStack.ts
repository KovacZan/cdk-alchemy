import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { MinedTransactionsInitializer } from "cdk-alchemy-webhooks";

interface MinedTransactionsStackProps extends cdk.StackProps {
	alchemyApiKey: string;
	alchemyAuthToken: string;
	alchemyAppId: string;
}

export class MinedTransactionsStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: MinedTransactionsStackProps) {
		super(scope, id, props);

		new MinedTransactionsInitializer(this, "MinedTransactionsExample", {
			alchemyApiKey: props.alchemyApiKey,
			alchemyNetwork: "eth-mainnet",
			alchemyAuthToken: props.alchemyAuthToken,
			alchemyWebhookDestinationUrl: "https://www.google.com",
			alchemyAppId: props.alchemyAppId
		});
	}
}
