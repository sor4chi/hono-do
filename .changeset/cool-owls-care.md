---
"hono-do": minor
---

Support Alarms API

You can now create and manage alarms using the Alarms API. See the [Alarms API documentation](https://developers.cloudflare.com/durable-objects/api/alarms-in-durable-objects/) for details.

```ts
import { generateHonoObject } from "hono-do";

const SECONDS = 1000;

declare module "hono-do" {
  interface HonoObjectVars {
    count: number; // custom fields (vars) type support
  }
}

export const Batcher = generateHonoObject("/batcher", async (app, { storage }, vars) => {
    vars.count = (await storage.get<number>("count")) ?? 0;

    app.post("/", async (c) => {
      vars.count++;

      const currentAlarm = await storage.getAlarm();
      if (currentAlarm == null) {
        await storage.setAlarm(Date.now() + 10 * SECONDS);
      }

      return c.json({ queued: vars.count });
    });
  },
).alarm(async ({ storage }, vars) => {
  console.log("Alarm fired, count is", vars.count);
  await storage.deleteAll();
  vars.count = 0;
});
```
