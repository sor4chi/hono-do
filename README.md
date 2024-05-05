# Hono for Durable Object

Hono DO is a wrapper of [Cloudflare Workers](https://workers.cloudflare.com/) ' [Durable Object](https://developers.cloudflare.com/workers/learning/using-durable-objects), designed for [Hono](https://hono.dev/).

> [!IMPORTANT]
> Cloudflare released [RPC](https://developers.cloudflare.com/workers/runtime-apis/rpc/) feature, which is a better way to communicate between Durable Objects.
> This library was developed to improve the developer experience for Durable Objects when RPC was not yet available.
> So, please consider it before using this library.

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

## Support

- [x] [Alarm API](https://developers.cloudflare.com/durable-objects/api/alarms/)
- [x] [Hibernation Websocket API](https://developers.cloudflare.com/durable-objects/learning/websockets/#websocket-hibernation)

## License

[MIT](./LICENSE)

## Contributing

This project is open for contributions. Feel free to open an issue or a pull request!
[Contributing Guide](./CONTRIBUTING.md) for more information.
