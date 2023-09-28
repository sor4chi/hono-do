// ref: https://developers.cloudflare.com/durable-objects/api/alarms-in-durable-objects/

import { generateHonoObject } from "hono-do";

const SECONDS = 1000;

declare module "hono-do" {
  interface HonoObjectVars {
    count: number;
  }
}

export const Batcher = generateHonoObject(
  "/batcher",
  async (app, state, vars) => {
    const { storage } = state;
    const vals = await storage.list({ reverse: true, limit: 1 });
    vars.count = vals.size === 0 ? 0 : parseInt(vals.keys().next().value);

    app.post("/", async (c) => {
      vars.count++;

      const currentAlarm = await storage.getAlarm();
      if (currentAlarm == null) {
        await storage.setAlarm(Date.now() + 10 * SECONDS);
      }

      await storage.put(vars.count.toString(), await c.req.text());
      return c.json({ queued: vars.count });
    });
  },
).alarm(async (state, vars) => {
  const { storage } = state;
  const vals = await storage.list();
  console.log(Array.from(vals.values())); // eg: POST other upstream service
  await storage.deleteAll();
  vars.count = 0;
});
