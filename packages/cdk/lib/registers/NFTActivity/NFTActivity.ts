import { Construct } from 'constructs';
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { BigNumber, Network } from "alchemy-sdk";

export interface NFTActivityProps {
    alchemyApiKey: string;
    alchemyNetwork: Network | string;
    alchemyAuthToken: string;
    alchemyWebhookDestinationUrl: string;
    alchemyContractAddress?: string;
    alchemyTokenId?: string | number | BigNumber;

}

export class NFTActivityConstruct extends Construct {

    public readonly description = "Construct for NFT Activity Alchemy Notify/Webhook Functionality";
    public readonly functionDuration = Duration.minutes(15);

    public readonly func: NodejsFunction;
    constructor(scope: Construct, id: string, private readonly props: NFTActivityProps) {
        super(scope, id);

        this.func = new NodejsFunction(this, "NFTActivityLambda", {
            entry: path.resolve(__dirname, "Webhook.lambda.ts"),
            description: this.description,
            timeout: this.functionDuration,
            initialPolicy: [],
            environment: {
                ALCHEMY_API_KEY: this.props.alchemyApiKey,
                ALCHEMY_NETWORK: this.props.alchemyNetwork,
                ALCHEMY_AUTH_TOKEN: this.props.alchemyAuthToken,
                ALCHEMY_WEBHOOK_DESTINATION_URL: this.props.alchemyWebhookDestinationUrl,
                ALCHEMY_CONTRACT_ADDRESS: this.props.alchemyContractAddress!, // TODO: adjust
                ALCHEMY_TOKEN_ID: this.props.alchemyTokenId!.toString(), // TODO: adjust
            }
        });
    }
}
