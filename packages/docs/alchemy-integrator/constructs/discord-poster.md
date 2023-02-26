---
sidebar_position: 1
---

# Discord Poster

## Setup 

Allows you to set up middleware between Alchemy Webhooks and Discord Webhooks.
It gives you the ability to fully customize your Discord Bot Notification Messages
with help of [Mustache](https://github.com/janl/mustache.js) templates.


```typescript
import { DiscordPosterConstruct } from "@kovi-soft/cdk-alchemy-integrator";


const discordPoster = new DiscordPosterConstruct(this, "DiscordPosterExample", {
    alchemySigningKey: "<your-alchemy-signing-key>",
    discordWebhookUsername: "Crazy Alchy Bot",
    discordWebhookUrl: "<discord-webhook-url>",
    discordMustacheTemplate: "<your-mustache-template>"
});
```

:::important

Instead of original `{{param}}` mustache template we will use `<% param %>`.
This is because template is stored in SSM (adapters will be proved later on)
which does not support `{}` characters

:::


*Check the examples package on Github for more information*
