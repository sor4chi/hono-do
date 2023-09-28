import { Hono } from "hono";

import { Template } from "./template";

const app = new Hono<{
  Bindings: {
    COUNTER: DurableObjectNamespace;
  };
}>();

app.get("/", (c) => {
  return c.html(Template);
});

app.all("/counter/*", (c) => {
  const id = c.env.COUNTER.idFromName("Counter");
  const obj = c.env.COUNTER.get(id);
  return obj.fetch(c.req.raw);
});

export default app;
export * from "./counter";
