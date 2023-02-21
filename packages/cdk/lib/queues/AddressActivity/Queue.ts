import { Construct } from "constructs";
import { Queue, QueueProps } from "aws-cdk-lib/aws-sqs";

export interface AddressActivityQueueProps {
	queueProps: QueueProps;
}

export class AddressActivityQueueConstruct extends Construct {
	public readonly queue: Queue;

	constructor(scope: Construct, id: string, private readonly props: AddressActivityQueueProps) {
		super(scope, id);

		this.queue = new Queue(this, "AddressActivityQueue", this.props.queueProps);
	}
}
