import { Construct } from "constructs";
import { Trigger } from "aws-cdk-lib/triggers";
import { AddressActivityConstruct, AddressActivityProps } from "./AddressActivity";

export type NFTActivityInitializerProps = AddressActivityProps;

export class AddressActivityInitializer extends Construct {
	public readonly addressActivityConstruct: AddressActivityConstruct;
	public readonly trigger: Trigger;

	constructor(scope: Construct, id: string, props: NFTActivityInitializerProps) {
		super(scope, id);

		this.addressActivityConstruct = new AddressActivityConstruct(scope, "AddressActivityInitializer", props);

		this.trigger = new Trigger(this, "AddressActivityInitializerTrigger", {
			handler: this.addressActivityConstruct.func,
			executeAfter: [this],
			executeOnHandlerChange: true
		});
	}
}
