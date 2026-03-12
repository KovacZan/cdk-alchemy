import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { CustomWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";

interface CustomWebhookStackProps extends cdk.StackProps {
	alchemyApiKey: string;
	alchemyAuthToken: string;
}

export class CustomWebhookStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: CustomWebhookStackProps) {
		super(scope, id, props);

		new CustomWebhook(this, "CustomWebhookExample", {
			alchemyApiKey: AlchemyCredential.fromPlainText(props.alchemyApiKey),
			alchemyNetwork: "eth-mainnet",
			alchemyAuthToken: AlchemyCredential.fromPlainText(props.alchemyAuthToken),
			alchemyWebhookDestinationUrl: "https://www.google.com",
			alchemyWebhookName: "MyCustomWebhook",
			alchemyGraphqlQuery: `{
				block {
					hash
					number
					timestamp
					transactions {
						from {
							address
						}
						createdContract {
							address
						}
					}
				}
			}`
		});
	}
}
