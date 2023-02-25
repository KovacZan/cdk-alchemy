import { Construct } from "constructs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { Queue, QueueProps } from "aws-cdk-lib/aws-sqs";
import { AddressActivityConstruct, AddressActivityProps } from "./AddressActivity";

export interface AddressActivityQueueProps {
	queueProps?: QueueProps;
	addressActivityProps: AddressActivityProps;
}

export class AddressActivityQueueConstruct extends Construct {
	public readonly queue: Queue;
	public readonly addressActivity: AddressActivityConstruct;

	constructor(scope: Construct, id: string, private readonly props: AddressActivityQueueProps) {
		super(scope, id);

		this.addressActivity = new AddressActivityConstruct(
			scope,
			"AddressActivityConstruct",
			this.props.addressActivityProps
		);

		this.queue = new Queue(this, "AddressActivityQueue", this.props.queueProps);

		this.addressActivity.func.addEventSource(new SqsEventSource(this.queue));
	}
}
