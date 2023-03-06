---
sidebar_position: 5
---

# Future Development

This project was created in order to compete in 
[Alchemy SDK Developer Challenge](https://www.alchemy.com/sdk-developer-challenge), but with 
mindset, that we can create something other people can use and expand the ecosystem to new limits.

We intend to finish and polish the project even after competition ends. This is also why
some pages have danger signs, to be careful using it before its finished.

## Current Implementation

Currently, there are two main implemented Construct types:
- **Initializers** - allowing you to provision initial webhook setup
- **Queues** - providing you the ability to easily update Webhooks in "Runtime"

Underneath we use a few AWS Services, such as CDK, SSM, SQS, Lambda, SecretManager, but 
plan to add more flexibility to the library, with ability to pick your favourite service,
for the part of the app you want.
Meaning that if you want to store Alchemy Signing Key into Plain SSM Instead of SecretManager, 
you will have an option to do so.


## Future Features and Improvements

As mentioned above we want to polish the module even after the competition ends.
We will polish out some of already implemented features as well as adding more
flexibility to certain parts of this library. That way end users (developers) will
have all options to choose or replace certain parts with their own implementations.

### We plan to add
- Adapter to pick your wanted service for api keys
- Adapter to pick your wanted "storage" for signing secret
- Add S3 support, for adapters
- Polish the existing functionality and add more abstraction, while also exposing all
necessary configurable parameters to the developer
- Tests, tests and TESTS
