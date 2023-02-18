import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { WebhookTrigger } from '../lib/index';

test('CDK Alchemy webhooks', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, "TestStack");
//   // WHEN
  new WebhookTrigger.WebhookTriggerConstruct(stack, 'MyTestConstruct');
//   // THEN
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Timeout: 900
  });
});
