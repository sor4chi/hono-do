# hono-do

## 1.1.0

### Minor Changes

- [#31](https://github.com/sor4chi/hono-do/pull/31) [`44c46e2`](https://github.com/sor4chi/hono-do/commit/44c46e2c641e0f6cf5b962adfda651e963d3cfd7) Thanks [@sor4chi](https://github.com/sor4chi)! - feat: enable to get bindings env from vars

  ```ts
  import { generateHonoObject } from "hono-do";

  type Env = {
    Bindings: {
      KV: KVNamespace;
    };
  };

  export const Batcher = generateHonoObject<Env>(
    "/",
    async (app, state, vars) => {
      vars.env.KV; // KVNamespace
    },
  );
  ```

## 1.0.1

### Patch Changes

- [#26](https://github.com/sor4chi/hono-do/pull/26) [`bdb39b9`](https://github.com/sor4chi/hono-do/commit/bdb39b9f26d9fb6df859f24bf49c401f7665a816) Thanks [@sor4chi](https://github.com/sor4chi)! - Fixed a bug that caused an error when a duplicate route was registered when the basepath of HonoObject was dynamic.

## 1.0.0

### Major Changes

- [#21](https://github.com/sor4chi/hono-do/pull/21) [`f659d6c`](https://github.com/sor4chi/hono-do/commit/f659d6ce48e0c77f785a813faf1585d8f0b216ec) Thanks [@sor4chi](https://github.com/sor4chi)! - Support for three handlers about [Hibernation Websocket API](https://developers.cloudflare.com/durable-objects/learning/websockets/#websocket-hibernation).

  - `webSocketMessage` handler
  - `webSocketClose` handler
  - `webSocketError` handler

  You can use these handlers same way as `alarm` handler in Hono DO.

  ## Usage

  ### Flat way

  ```ts
  const DO = generateHonoObject("/", () => {});
  DO.alarm(async () => {});
  DO.webSocketMessage(async () => {});
  DO.webSocketClose(async () => {});
  DO.webSocketError(async () => {});
  ```

  ### Chaining way

  ```ts
  generateHonoObject("/", () => {})
    .alarm(async () => {})
    .webSocketMessage(async () => {})
    .webSocketClose(async () => {})
    .webSocketError(async () => {});
  ```

  ### Argument way

  ```ts
  generateHonoObject("/", () => {}, {
    alarm: async () => {},
    webSocketMessage: async () => {},
    webSocketClose: async () => {},
    webSocketError: async () => {},
  });
  ```

  Take care for registering multiple handlers for same event.
  If you register so, you will get an error.

  ## Breaking changes

  Changed the interface of how to configure `AlarmHandler` in `generateHonoObject` argument.

  ### Before

  ```ts
  generateHonoObject(
    "/",
    () => {},
    () => {
      console.log("alarm");
    },
  );
  ```

  ### After

  ```ts
  generateHonoObject("/", () => {}, {
    alarm: () => {
      console.log("alarm");
    },
  });
  ```

  This is because we want to support many fields of Durable Object as handlers.

## 0.2.1

### Patch Changes

- [#19](https://github.com/sor4chi/hono-do/pull/19) [`9722471`](https://github.com/sor4chi/hono-do/commit/9722471232447d56aa0fd60ac052fca2b30fb57d) Thanks [@sor4chi](https://github.com/sor4chi)! - Fixed an issue where the `BasePath` type in `generateHonoObject` did not inherit the basePath of the first argument.

  ```ts
  // Before
  generateHonoObject("/foo", (app) => {
    app.get("/bar", (c) => {
      c; // $ExpectType Context<Env, "/bar", {}>
    });
  });

  // After
  generateHonoObject("/foo", (app) => {
    app.get("/bar", (c) => {
      c; // $ExpectType Context<Env, "/foo/bar", {}>
    });
  });
  ```

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
