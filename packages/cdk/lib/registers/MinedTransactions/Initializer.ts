import { Construct } from "constructs";
import { Trigger } from "aws-cdk-lib/triggers";
import { MinedTransactionsConstruct, MinedTransactionsProps } from "./MinedTransactions";

export type MinedTransactionsInitializerProps = MinedTransactionsProps;

export class MinedTransactionsInitializer extends Construct {
	public readonly minedTransactionsConstruct: MinedTransactionsConstruct;
	public readonly trigger: Trigger;

	constructor(scope: Construct, id: string, props: MinedTransactionsInitializerProps) {
		super(scope, id);

		this.minedTransactionsConstruct = new MinedTransactionsConstruct(scope, "MinedTransactionsInitializer", props);

		this.trigger = new Trigger(this, "MinedTransactionsInitializerTrigger", {
			handler: this.minedTransactionsConstruct.func,
			executeAfter: [this],
			executeOnHandlerChange: true
		});
	}
}
