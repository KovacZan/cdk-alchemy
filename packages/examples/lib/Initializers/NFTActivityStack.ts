import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NFTActivityInitializer } from "cdk-alchemy-webhooks";

interface NFTActivityStackProps extends cdk.StackProps {
  alchemyApiKey: string;
  alchemyAuthToken: string;
}

export class NFTActivityStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: NFTActivityStackProps) {
    super(scope, id, props);

    new NFTActivityInitializer(this, "NFTActivityExample", {
      alchemyApiKey: props.alchemyApiKey,
      alchemyNetwork: "eth-mainnet",
      alchemyAuthToken: props.alchemyAuthToken,
      alchemyWebhookDestinationUrl: "https://www.google.com",
      alchemyContractAddress: "0x026224A2940bFE258D0dbE947919B62fE321F042",
      alchemyTokenId: "123"
    })
  }
}
