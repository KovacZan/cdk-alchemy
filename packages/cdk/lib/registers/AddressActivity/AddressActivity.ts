import { Construct } from 'constructs';
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { Network } from "alchemy-sdk";

export interface AddressActivityProps {
    alchemyApiKey: string;
    alchemyNetwork: Network | string;
    alchemyAuthToken: string;
    alchemyWebhookDestinationUrl: string;
    alchemyContractAddress?: string;
}

export class AddressActivityConstruct extends Construct {

    public readonly description = "Construct for Address Activity Alchemy Notify/Webhook Functionality";
    public readonly functionDuration = Duration.minutes(15);

    public readonly func: NodejsFunction;
    constructor(scope: Construct, id: string, private readonly props: AddressActivityProps) {
        super(scope, id);

        this.func = new NodejsFunction(this, "AddressActivityLambda", {
            entry: path.resolve(__dirname, "AddressActivity.lambda.ts"),
            description: this.description,
            timeout: this.functionDuration,
            initialPolicy: [],
            environment: {
                ALCHEMY_API_KEY: this.props.alchemyApiKey,
                ALCHEMY_NETWORK: this.props.alchemyNetwork,
                ALCHEMY_AUTH_TOKEN: this.props.alchemyAuthToken,
                ALCHEMY_WEBHOOK_DESTINATION_URL: this.props.alchemyWebhookDestinationUrl,
                ALCHEMY_CONTRACT_ADDRESS: this.props.alchemyContractAddress!,
            }
        });
    }
}
