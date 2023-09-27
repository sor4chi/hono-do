import { join } from "path";

import { unstable_dev } from "wrangler";

import { generateHonoObject } from "../src";

import type { UnstableDevWorker } from "wrangler";

describe("generateHonoObject", () => {
  it("return type should be satisified Durable Object interface", async () => {
    const DO = generateHonoObject("/", () => {});
    expect(DO.prototype.fetch).toBeDefined();
  });

  it("should work generics type", async () => {
    generateHonoObject<{
      Variables: {
        HOGE_VAR: string;
      };
      Bindings: {
        HOGE_DB: D1Database;
      };
    }>("/", (app) => {
      app.get("/hoge", async (c) => {
        expectTypeOf(c.var.HOGE_VAR).toEqualTypeOf<string>();
        expectTypeOf(c.env.HOGE_DB).toEqualTypeOf<D1Database>();
      });
    });
  });
});

describe("Worker", () => {
  describe("Simple", () => {
    let worker: UnstableDevWorker;

    beforeAll(async () => {
      worker = await unstable_dev(join(__dirname, "fixtures/simple/index.ts"), {
        experimental: { disableExperimentalWarning: true },
      });
    });

    afterAll(async () => {
      await worker.stop();
    });

    it("should work with base path", async () => {
      const resp = await worker.fetch("/simple");
      expect(resp.status).toBe(200);
      expect(await resp.text()).toBe("Hello, Hono DO!");
    });
  });

  describe("DelayInit", () => {
    let worker: UnstableDevWorker;

    beforeEach(async () => {
      worker = await unstable_dev(
        join(__dirname, "fixtures/delay-init/index.ts"),
        {
          experimental: { disableExperimentalWarning: true },
        },
      );
    });

    afterEach(async () => {
      await worker.stop();
    });

    it("should wait for initialization", async () => {
      const resp = await worker.fetch("/delay-init/count");
      expect(resp.status).toBe(200);
      expect(await resp.text()).toBe("1");
    });
  });
});
