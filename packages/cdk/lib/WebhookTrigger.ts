import { Construct } from 'constructs';
import { Trigger } from "aws-cdk-lib/triggers";
import { WebhooksConstruct, WebhooksConstructProps } from "./Webhook";

export interface WebhookTriggerProps extends WebhooksConstructProps {

}

export class WebhookTriggerConstruct extends Construct {

    constructor(scope: Construct, id: string, props: WebhookTriggerProps) {
        super(scope, id);

        const webhook = new WebhooksConstruct(scope, "WebhooksConstruct", props);

        new Trigger(this, "Trigger", {
            handler: webhook.func,
            executeAfter: [this],
            executeOnHandlerChange: true,
        });
    }
}
