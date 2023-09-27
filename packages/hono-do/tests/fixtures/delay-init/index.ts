import { Hono } from "hono";

import { generateHonoObject } from "../../../src";

const app = new Hono<{
  Bindings: {
    DELAY_INIT: DurableObjectNamespace;
  };
}>();

app.all("/delay-init/*", (c) => {
  const id = c.env.DELAY_INIT.idFromName("delay-init");
  const obj = c.env.DELAY_INIT.get(id);
  return obj.fetch(c.req.raw);
});

export const DelayInit = generateHonoObject("/delay-init", async (app) => {
  let count = 0;
  app.get("/count", (c) => c.text(String(count)));
  await new Promise((resolve) => setTimeout(resolve, 1000));
  count = 1;
});

export default app;
