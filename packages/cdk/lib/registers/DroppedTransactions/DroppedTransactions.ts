import { Construct } from 'constructs';
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { Network } from "alchemy-sdk";

export interface DroppedTransactionsProps {
    alchemyApiKey: string;
    alchemyNetwork: Network | string;
    alchemyAuthToken: string;
    alchemyWebhookDestinationUrl: string;
    alchemyAppId: string;
}

export class DroppedTransactionsConstruct extends Construct {

    public readonly description = "Construct for Dropped Transactions Notifications Alchemy Notify/Webhook Functionality";
    public readonly functionDuration = Duration.minutes(15);

    public readonly func: NodejsFunction;
    constructor(scope: Construct, id: string, private readonly props: DroppedTransactionsProps) {
        super(scope, id);

        this.func = new NodejsFunction(this, "DroppedTransactionsLambda", {
            entry: path.resolve(__dirname, "DroppedTransactions.lambda.ts"),
            description: this.description,
            timeout: this.functionDuration,
            initialPolicy: [],
            environment: {
                ALCHEMY_APP_ID: this.props.alchemyAppId,
                ALCHEMY_API_KEY: this.props.alchemyApiKey,
                ALCHEMY_NETWORK: this.props.alchemyNetwork,
                ALCHEMY_AUTH_TOKEN: this.props.alchemyAuthToken,
                ALCHEMY_WEBHOOK_DESTINATION_URL: this.props.alchemyWebhookDestinationUrl,
            }
        });
    }
}
