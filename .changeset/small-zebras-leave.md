---
"hono-do": minor
---

Add `byName` handler for making DO proxy easier.

## Without proxy

```ts
app.all("/counter/*", (c) => {
  const id = c.env.COUNTER.idFromName("Counter");
  const obj = c.env.COUNTER.get(id);
  return obj.fetch(c.req.raw);
});
```

## With proxy

```ts
app.use("/counter/*", Counter.byName("COUNTER", "Counter"));
```

`.byName` is a handler to proxy the request to the DO object with the given name.
The first argument is the name of the Binding namespace, the second is the name of the DO object.

### Dynamic name

```ts
export const Room = generateHonoObject("/room/:roomId", (app) => {
    app.get("/", (c) => c.text(`Room ${c.req.param("roomId")}`));
})

app.use("/room/*", Room.byName("ROOM", (c) => c.req.param("roomId")));
```

Using callback as the second argument, the name of the DO object can be dynamic.
You can separate objects for each request path.
