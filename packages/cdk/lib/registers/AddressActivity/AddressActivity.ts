import { Construct } from 'constructs';
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { Network } from "alchemy-sdk";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { v4 as uuid } from "uuid";

export interface AddressActivityProps {
    alchemyApiKey: string;
    alchemyNetwork: Network | string;
    alchemyAuthToken: string;
    alchemyWebhookDestinationUrl: string;
    alchemyContractAddress?: string;
    ssmPathToRandomId?: string;
}

export class AddressActivityConstruct extends Construct {

    public readonly description = "Construct for Address Activity Alchemy Notify/Webhook Functionality";
    public readonly functionDuration = Duration.minutes(15);

    public readonly func: NodejsFunction;

    public ssmPathToRandomId = "/cdk-alchemy-webhooks/nft-activity/secret";
    public secretIdSSM: StringParameter;
    constructor(scope: Construct, id: string, private readonly props: AddressActivityProps) {
        super(scope, id);

        if (this.props.ssmPathToRandomId) {
            this.ssmPathToRandomId = this.props.ssmPathToRandomId;
        }

        this.secretIdSSM= new StringParameter(this, "RandomIdStringParameter", {
            stringValue: `${this.ssmPathToRandomId}/${uuid()}`,
            parameterName: this.ssmPathToRandomId,
        });

        this.func = new NodejsFunction(this, "AddressActivityLambda", {
            entry: path.resolve(__dirname, "AddressActivity.lambda.ts"),
            description: this.description,
            timeout: this.functionDuration,
            runtime: Runtime.NODEJS_18_X,
            initialPolicy: [
                new PolicyStatement({
                    actions: ["secretsmanager:CreateSecret"],
                    resources: ["*"],
                }),
                new PolicyStatement({
                    actions: ["ssm:GetParameter*"],
                    resources: ["*"], // TODO
                })
            ],
            environment: {
                ALCHEMY_API_KEY: this.props.alchemyApiKey,
                ALCHEMY_NETWORK: this.props.alchemyNetwork,
                ALCHEMY_AUTH_TOKEN: this.props.alchemyAuthToken,
                ALCHEMY_WEBHOOK_DESTINATION_URL: this.props.alchemyWebhookDestinationUrl,
                ALCHEMY_CONTRACT_ADDRESS: this.props.alchemyContractAddress!,

                SSM_PATH_TO_SECRET: this.secretIdSSM.parameterName,
            }
        });
    }
}
