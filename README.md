# Hono for Durable Object

Hono DO is a wrapper of [Cloudflare Workers](https://workers.cloudflare.com/) ' [Durable Object](https://developers.cloudflare.com/workers/learning/using-durable-objects), designed for [Hono](https://hono.dev/).

> [!WARNING]
> This is a work in progress. The code is not yet ready for production use.

```bash
$ npm install hono-do
```

## Usage

```typescript
export const Counter = generateHonoObject("/counter", async (app, state) => {
  const { storage } = state;
  let value = (await storage.get<number>("value")) ?? 0;

  app.post("/increment", (c) => {
    storage.put("value", value++);
    return c.text(value.toString());
  });

  app.post("/decrement", (c) => {
    storage.put("value", value--);
    return c.text(value.toString());
  });

  app.get("/", (c) => {
    return c.text(value.toString());
  });
});
```

You want to find more? Check out the [examples](./examples)!
