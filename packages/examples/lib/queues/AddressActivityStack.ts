import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { AddressActivityQueue } from "@kovi-soft/cdk-alchemy-webhooks";

interface AddressActivityQueueStackProps extends cdk.StackProps {
	alchemyApiKey: string;
	alchemyAuthToken: string;
}

export class AddressActivityQueueStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: AddressActivityQueueStackProps) {
		super(scope, id, props);

		new AddressActivityQueue(this, "AddressActivityQueueExample", {
			addressActivityProps: {
				alchemyApiKey: props.alchemyApiKey,
				alchemyNetwork: "eth-mainnet",
				alchemyAuthToken: props.alchemyAuthToken
			}
		});
	}
}
