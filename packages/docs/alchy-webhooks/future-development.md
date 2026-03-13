---
sidebar_position: 6
---

# Future Development

This project was created in order to compete in
[Alchemy SDK Developer Challenge](https://www.alchemy.com/sdk-developer-challenge), but with
mindset, that we can create something other people can use and expand the ecosystem to new limits.

We intend to finish and polish the project even after competition ends.

## Current Implementation

Currently, the main implemented Construct type is:
- **Webhooks** — allowing you to provision webhook setup for Address Activity, NFT Activity, and Custom GraphQL queries

Underneath we use a few AWS Services, such as CDK, SSM, Lambda, and Secrets Manager.
The `AlchemyCredential` abstraction provides flexibility to pick your preferred credential source
(plain text, SSM Parameter Store, or Secrets Manager).

## Future Features and Improvements

We will polish out some of already implemented features as well as adding more
flexibility to certain parts of this library. That way end users (developers) will
have all options to choose or replace certain parts with their own implementations.

### We plan to add
- Add S3 support for credential adapters
- Polish the existing functionality and add more abstraction, while also exposing all
necessary configurable parameters to the developer
- Tests, tests and TESTS
