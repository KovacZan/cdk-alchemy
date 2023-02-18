import { Construct } from 'constructs';
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { BigNumber, Network } from "alchemy-sdk";

export interface WebhooksConstructProps {
    alchemyApiKey: string;
    alchemyNetwork: Network | string;
    alchemyAuthToken: string;
    alchemyWebhookDestinationUrl: string;
    alchemyContractAddress?: string;
    alchemyTokenId?: string | number | BigNumber;

}

export class WebhooksConstruct extends Construct {

    public readonly description = "Lambda setting Alchemy Notify/Webhooks Functionality";
    public readonly functionDuration = Duration.minutes(15);

    public readonly func: NodejsFunction;
    constructor(scope: Construct, id: string, private readonly props: WebhooksConstructProps) {
        super(scope, id);

        this.func = new NodejsFunction(this, "WebhooksConstruct", {
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
