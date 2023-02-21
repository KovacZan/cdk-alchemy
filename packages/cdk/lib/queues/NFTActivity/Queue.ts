import { Construct } from 'constructs';
import { Queue, QueueProps } from "aws-cdk-lib/aws-sqs";

export interface NFTActivityQueueProps {
    queueProps: QueueProps
}

export class NFTActivityQueueConstruct extends Construct {

    public readonly queue: Queue;

    constructor(scope: Construct, id: string, private readonly props: NFTActivityQueueProps) {
        super(scope, id);

        this.queue = new Queue(this, "NFTActivityQueue", this.props.queueProps);
    }
}
