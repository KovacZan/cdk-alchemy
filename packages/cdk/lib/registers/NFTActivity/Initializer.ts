import { Construct } from 'constructs';
import { Trigger } from "aws-cdk-lib/triggers";
import { NFTActivityConstruct, NFTActivityProps } from "./NFTActivity";

export interface NFTActivityInitializerProps extends NFTActivityProps {

}

export class NFTActivityInitializer extends Construct {
    public readonly nftActivityConstruct: NFTActivityConstruct;
    public readonly trigger: Trigger;

    constructor(scope: Construct, id: string, props: NFTActivityInitializerProps) {
        super(scope, id);

        this.nftActivityConstruct = new NFTActivityConstruct(scope, "NFTActivityInitializer", props);

        this.trigger = new Trigger(this, "NFTActivityInitializerTrigger", {
            handler: this.nftActivityConstruct.func,
            executeAfter: [this],
            executeOnHandlerChange: true,
        });
    }
}
