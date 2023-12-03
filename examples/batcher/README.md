# Hono DO Batcher

This example is a batcher using Durable Object's Alarm API.
The code is based on [Cloudflare's Alarm example](https://developers.cloudflare.com/durable-objects/api/alarms-in-durable-objects).

```
pnpm install
```

Setup the database:

```
pnpm create-db
```

Copy the outputted database configuration.
Add the database configuration to the `wrangler.toml` file.

Add the following to the `wrangler.toml` file's `[[d1_databases]]` section:

```
preview_database_id = "DB"
```

Run the following to start the batcher:

```
pnpm dev
```
