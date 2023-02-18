import { Construct } from 'constructs';
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { Network } from "alchemy-sdk";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export interface AddressActivityProps {
    alchemyApiKey: string;
    alchemyNetwork: Network | string;
    alchemyAuthToken: string;
    ssmPathToRandomId?: string;
}

export class AddressActivityConstruct extends Construct {

    public readonly description = "Construct for Address Activity Alchemy Notify/Webhook Functionality, containing Queue Lambda Implementation";
    public readonly functionDuration = Duration.minutes(15);

    public readonly func: NodejsFunction;

    public ssmPathToRandomId = "/cdk-alchemy-webhooks/address-activity/secret";
    constructor(scope: Construct, id: string, private readonly props: AddressActivityProps) {
        super(scope, id);

        if (this.props.ssmPathToRandomId) {
            this.ssmPathToRandomId = this.props.ssmPathToRandomId;
        }

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

                SSM_PATH_TO_SECRET: this.ssmPathToRandomId,
            }
        });
    }
}
