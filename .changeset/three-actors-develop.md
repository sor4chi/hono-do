---
"hono-do": major
---

Support for three handlers about [Hibernation Websocket API](https://developers.cloudflare.com/durable-objects/learning/websockets/#websocket-hibernation).

- `webSocketMessage` handler
- `webSocketClose` handler
- `webSocketError` handler

You can use these handlers same way as `alarm` handler in Hono DO.

## Usage

### Flat way

```ts
const DO = generateHonoObject("/", () => {});
DO.alarm(async () => {});
DO.webSocketMessage(async () => {});
DO.webSocketClose(async () => {});
DO.webSocketError(async () => {});
```

### Chaining way

```ts
generateHonoObject("/", () => {})
    .alarm(async () => {})
    .webSocketMessage(async () => {})
    .webSocketClose(async () => {})
    .webSocketError(async () => {});
```

### Argument way

```ts
generateHonoObject("/", () => {}, {
    alarm: async () => {},
    webSocketMessage: async () => {},
    webSocketClose: async () => {},
    webSocketError: async () => {},
});
```

Take care for registering multiple handlers for same event.
If you register so, you will get an error.
