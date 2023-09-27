import { Hono } from "hono";

import { generateHonoObject } from "../../../src";

const app = new Hono<{
  Bindings: {
    SIMPLE: DurableObjectNamespace;
  };
}>();

app.all("/simple/*", (c) => {
  const id = c.env.SIMPLE.idFromName("simple");
  const obj = c.env.SIMPLE.get(id);
  return obj.fetch(c.req.raw);
});

export const Simple = generateHonoObject("/simple", async (app) => {
  app.get("/", (c) => c.text("Hello, Hono DO!"));
});

export default app;
