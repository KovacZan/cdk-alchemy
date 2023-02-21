import { Construct } from "constructs";
import { Trigger } from "aws-cdk-lib/triggers";
import { DroppedTransactionsConstruct, DroppedTransactionsProps } from "./DroppedTransactions";

export type DroppedTransactionsInitializerProps = DroppedTransactionsProps;

export class DroppedTransactionsInitializer extends Construct {
	public readonly droppedTransactionsConstruct: DroppedTransactionsConstruct;
	public readonly trigger: Trigger;

	constructor(scope: Construct, id: string, props: DroppedTransactionsInitializerProps) {
		super(scope, id);

		this.droppedTransactionsConstruct = new DroppedTransactionsConstruct(
			scope,
			"DroppedTransactionsInitializer",
			props
		);

		this.trigger = new Trigger(this, "DroppedTransactionsInitializerTrigger", {
			handler: this.droppedTransactionsConstruct.func,
			executeAfter: [this],
			executeOnHandlerChange: true
		});
	}
}
