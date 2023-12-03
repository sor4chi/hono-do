import { Hono } from "hono";

export interface Env {
  Bindings: {
    BATCHER: DurableObjectNamespace;
    DB: D1Database;
  };
}

const app = new Hono<Env>();

app.all("/batcher/*", (c) => {
  const id = c.env.BATCHER.idFromName("Batcher");
  const obj = c.env.BATCHER.get(id);
  return obj.fetch(c.req.raw);
});

export default app;
export * from "./batcher";
