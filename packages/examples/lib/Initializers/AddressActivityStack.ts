import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { AddressActivityInitializer } from "@kovi-soft/cdk-alchemy-webhooks";

interface AddressActivityStackProps extends cdk.StackProps {
	alchemyApiKey: string;
	alchemyAuthToken: string;
}

export class AddressActivityStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: AddressActivityStackProps) {
		super(scope, id, props);

		new AddressActivityInitializer(this, "AddressActivityExample", {
			alchemyApiKey: props.alchemyApiKey,
			alchemyNetwork: "eth-mainnet",
			alchemyAuthToken: props.alchemyAuthToken,
			alchemyWebhookDestinationUrl: "https://www.google.com",
			alchemyContractAddress: "0x026224A2940bFE258D0dbE947919B62fE321F042"
		});
	}
}
