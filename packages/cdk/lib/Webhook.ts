import { Construct } from 'constructs';
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";

export interface WebhooksConstructProps {
    // Define construct properties here
}

export class WebhooksConstruct extends Construct {

    public readonly description = "Lambda setting Alchemy Notify/Webhooks Functionality";
    public readonly functionDuration = Duration.minutes(15);

    public readonly func: NodejsFunction;
    constructor(scope: Construct, id: string, props: WebhooksConstructProps = {}) {
        super(scope, id);

        this.func = new NodejsFunction(this, "WebhooksConstruct", {
            entry: path.resolve(__dirname, "Webhook.lambda.ts"),
            description: this.description,
            timeout: this.functionDuration,
            initialPolicy: [],
        });
    }
}
