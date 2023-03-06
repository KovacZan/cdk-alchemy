---
sidebar_position: 5
---

# Future Development

As already mentioned [here](http://localhost:3000/alchemy-webhooks/future-development).

This project was created in order to compete in 
[Alchemy SDK Developer Challenge](https://www.alchemy.com/sdk-developer-challenge), but with 
mindset, that we can create something other people can use and expand the ecosystem to new limits.

We intend to finish and polish the project even after competition ends. This is also why
some pages have danger signs, to be careful using it before its finished.

## Current Implementation

Currently, there is only `DiscordPoster` implemented, but we plan to add additional Integration
Middlewares to it.

Underneath CDK Alchemy Integrator uses various AWS Services, 
such as CDK, SSM and Lambda for Rest Api Gateway integration.
It uses [Mustache](https://github.com/janl/mustache.js) for templating.
We plan to add more flexibility in the future, with ability to pick your favourite service,
for the part of the integration app you want.

## Future Features and Improvements

As mentioned above we want to polish the module even after the competition ends.
We will polish out some of already implemented features as well as adding more
flexibility to certain parts of this library. That way end users (developers) will
have options to choose or replace certain parts with their own implementations.

### We plan to add
- Adapters for key storage
- S3 Support for templating
- Polish the existing functionality and add more abstraction, while also exposing all
necessary configurable parameters to the developer
- Add more Integration Providers such as Slack
- Tests, tests and TESTS
