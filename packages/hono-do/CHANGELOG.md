# hono-do

## 0.2.0

### Minor Changes

- [#14](https://github.com/sor4chi/hono-do/pull/14) [`1d59c26`](https://github.com/sor4chi/hono-do/commit/1d59c26223aeb098064d7c320d531fc50ef525f4) Thanks [@sor4chi](https://github.com/sor4chi)! - Support Alarms API

  You can now create and manage alarms using the Alarms API. See the [Alarms API documentation](https://developers.cloudflare.com/durable-objects/api/alarms-in-durable-objects/) for details.

  ```ts
  import { generateHonoObject } from "hono-do";

  const SECONDS = 1000;

  declare module "hono-do" {
    interface HonoObjectVars {
      count: number; // custom fields (vars) type support
    }
  }

  export const Batcher = generateHonoObject(
    "/batcher",
    async (app, { storage }, vars) => {
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

- [#2](https://github.com/sor4chi/hono-do/pull/2) [`7de88ad`](https://github.com/sor4chi/hono-do/commit/7de88ad95123fb7fb074251273edf9b1b4f79abe) Thanks [@sor4chi](https://github.com/sor4chi)! - Implement storage helper as sub package

  You can use `state.storage` type-safely like hooks in React.

  ```ts
  import { defineStorage } from "hono-do/storage";

  export const Counter = generateHonoObject(
    "/counter",
    async (app, { storage }) => {
      const [getValue, setValue, delValue] = await defineStorage(
        storage,
        "value",
        0,
      );

      await getValue(); // 0
      await setValue(1);
      await getValue(); // 1

      await setValue((value) => value + 1); // 2
      await getValue(); // 2

      await delValue();
      await getValue(); // 0
    },
  );
  ```

## 0.1.0

### Minor Changes

- [#3](https://github.com/sor4chi/hono-do/pull/3) [`7fc9954`](https://github.com/sor4chi/hono-do/commit/7fc995476cc27fd48194b07f395d4fa0bce070df) Thanks [@sor4chi](https://github.com/sor4chi)! - wrap initialize function of durable object with blockConcurrencyWhile
