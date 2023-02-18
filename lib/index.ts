// import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface CdkAlchemyWebhooksProps {
  // Define construct properties here
}

export class CdkAlchemyWebhooks extends Construct {

  constructor(scope: Construct, id: string, props: CdkAlchemyWebhooksProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkAlchemyWebhooksQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
