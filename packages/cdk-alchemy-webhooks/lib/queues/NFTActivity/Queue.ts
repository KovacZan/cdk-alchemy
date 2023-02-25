import { Construct } from "constructs";
import { Queue, QueueProps } from "aws-cdk-lib/aws-sqs";
import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";

import { NFTActivityConstruct, NFTActivityProps } from "./NFTActivity";

export interface NFTActivityQueueProps {
	queueProps?: QueueProps;
	nftActivityProps: NFTActivityProps;
}

export class NFTActivityQueueConstruct extends Construct {
	public readonly queue: Queue;
	public readonly nftActivity: NFTActivityConstruct;

	constructor(scope: Construct, id: string, private readonly props: NFTActivityQueueProps) {
		super(scope, id);

		this.nftActivity = new NFTActivityConstruct(scope, "NFTActivityConstruct", this.props.nftActivityProps);

		this.queue = new Queue(this, "NFTActivityQueue", this.props.queueProps);

		this.nftActivity.func.addEventSource(new SqsEventSource(this.queue));
	}
}
