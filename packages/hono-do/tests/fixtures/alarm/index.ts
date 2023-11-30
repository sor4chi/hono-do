import { Hono } from "hono";

import { generateHonoObject } from "../../../src";

const app = new Hono<{
  Bindings: {
    ALARM: DurableObjectNamespace;
  };
}>();

app.all("/alarm/*", (c) => {
  const id = c.env.ALARM.idFromName("alarm");
  const obj = c.env.ALARM.get(id);
  return obj.fetch(c.req.raw);
});

export const Alarm = generateHonoObject(
  "/alarm",
  async (app, { storage }, vars) => {
    app.post("/", async (c) => {
      const currentAlarm = await storage.getAlarm();
      if (currentAlarm == null) {
        await storage.setAlarm(Date.now() + 100);
      }

      return c.json({ queued: true });
    });

    app.get("/", async (c) => {
      // NOTE:
      // ```ts
      // declare module "hono-do" {
      //   interface HonoObjectVars {
      //     message: string;
      //   }
      // }
      // ```
      //
      // This will resolve the type error, but this code effects other files. so I don't use this.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return c.text(vars.message);
    });
  },
).alarm(async (state, vars) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  vars.message = "Hello, Hono DO!";
});

export default app;
