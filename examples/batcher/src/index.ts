import { Hono } from "hono";

const app = new Hono<{
  Bindings: {
    BATCHER: DurableObjectNamespace;
  };
}>();

app.all("/batcher/*", (c) => {
  const id = c.env.BATCHER.idFromName("Batcher");
  const obj = c.env.BATCHER.get(id);
  return obj.fetch(c.req.raw);
});

export default app;
export * from "./batcher";
