// ref: https://developers.cloudflare.com/durable-objects/api/alarms-in-durable-objects/

import { generateHonoObject } from "hono-do";

const SECONDS = 1000;

export const Batcher = generateHonoObject(
  "/batcher",
  async (app, state) => {
    const { storage } = state;

    app.post("/", async (c) => {
      let count = (await storage.get<number>("count")) || 0;
      await storage.put("count", (++count).toString());

      const currentAlarm = await storage.getAlarm();
      if (currentAlarm == null) {
        await storage.setAlarm(Date.now() + 10 * SECONDS);
      }

      await storage.put(count.toString(), await c.req.text());
      return c.json({ queued: count });
    });
  },
  async (state) => {
    const { storage } = state;
    await storage.delete("count");
    const vals = await storage.list();
    // await fetch("http://example.com/some-upstream-service", {
    //   method: "POST",
    //   body: Array.from(vals.values()),
    // });
    console.log(Array.from(vals.values()));
    await storage.deleteAll();
  },
);
