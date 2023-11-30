import { Hono } from "hono";

import { Template } from "./template";

const app = new Hono<{
  Bindings: {
    CHAT: DurableObjectNamespace;
  };
}>();

app.get("/", (c) => {
  return c.html(Template);
});

app.all("/chat/*", (c) => {
  const id = c.env.CHAT.idFromName("chat");
  const obj = c.env.CHAT.get(id);
  return obj.fetch(c.req.raw);
});

export default app;
export * from "./chat";
