import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NFTActivityQueue } from "cdk-alchemy-webhooks";

interface NFTActivityQueueStackProps extends cdk.StackProps {
	alchemyApiKey: string;
	alchemyAuthToken: string;
}

export class NFTActivityQueueStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: NFTActivityQueueStackProps) {
		super(scope, id, props);

		new NFTActivityQueue(this, "NFTActivityQueueExample", {
			nftActivityProps: {
				alchemyApiKey: props.alchemyApiKey,
				alchemyNetwork: "eth-mainnet",
				alchemyAuthToken: props.alchemyAuthToken
			}
		});
	}
}
