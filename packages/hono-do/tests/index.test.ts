import { join } from "path";

import { unstable_dev } from "wrangler";

import { generateHonoObject } from "../src";
import { Errors } from "../src/error";

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

  it("should work with type-safe base path", async () => {
    generateHonoObject("/:hogeId", (app) => {
      app.get("/:fugaId", async (c) => {
        expectTypeOf(c.req.param("hogeId")).toEqualTypeOf<string>();
        expectTypeOf(c.req.param("hogeId")).toEqualTypeOf<string>();
      });
    });
  });

  it("should work with handler chain by flat way", async () => {
    const DO = generateHonoObject("/", () => {});
    DO.alarm(async () => {});
    DO.webSocketMessage(async () => {});
    DO.webSocketClose(async () => {});
    DO.webSocketError(async () => {});
  });

  it("should work with handler chain by chain way", async () => {
    generateHonoObject("/", () => {})
      .alarm(async () => {})
      .webSocketMessage(async () => {})
      .webSocketClose(async () => {})
      .webSocketError(async () => {});
  });

  it("should error when multiple handler set to same Hono Object", async () => {
    const DO = generateHonoObject("/", () => {});
    DO.webSocketMessage(async () => {});
    expect(() => DO.alarm(async () => {})).not.toThrowError(
      Errors.handlerAlreadySet("alarm"),
    );
    expect(() => DO.webSocketMessage(async () => {})).toThrowError(
      Errors.handlerAlreadySet("webSocketMessage"),
    );
  });

  it("should error when multiple handler set to same Hono Object, with other way", async () => {
    const DO = generateHonoObject("/", () => {}, {
      alarm: async () => {},
    });
    expect(() => DO.alarm(async () => {})).toThrowError(
      Errors.handlerAlreadySet("alarm"),
    );
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

  describe("Alarm", () => {
    let worker: UnstableDevWorker;

    beforeEach(async () => {
      worker = await unstable_dev(join(__dirname, "fixtures/alarm/index.ts"), {
        experimental: { disableExperimentalWarning: true },
      });
    });

    afterEach(async () => {
      await worker.stop();
    });

    it("should work alarm handler", async () => {
      const resp = await worker.fetch("/alarm", { method: "POST" });
      expect(resp.status).toBe(200);
      expect(await resp.json()).toStrictEqual({ queued: true });

      // alarm set "Hello, Hono DO!" to vars.message after 100ms
      await new Promise((resolve) => setTimeout(resolve, 300));

      const resp2 = await worker.fetch("/alarm");
      expect(resp2.status).toBe(200);
      expect(await resp2.text()).toBe("Hello, Hono DO!");
    });
  });

  describe("Dynamic Entry", () => {
    let worker: UnstableDevWorker;

    beforeEach(async () => {
      worker = await unstable_dev(
        join(__dirname, "fixtures/dynamic-entry/index.ts"),
        {
          experimental: { disableExperimentalWarning: true },
        },
      );
    });

    afterEach(async () => {
      await worker.stop();
    });

    it("should work with multi entry", async () => {
      const roomId = Array.from({ length: 10 }).map(() =>
        Math.random().toString(36).slice(2),
      );

      for (const id of roomId) {
        const resp = await worker.fetch(`/room/${id}`);
        expect(resp.status).toBe(200);
        expect(await resp.text()).toBe(id);
      }
    });
  });

  describe("ByName Proxy", () => {
    describe("Simple", () => {
      let worker: UnstableDevWorker;

      beforeEach(async () => {
        worker = await unstable_dev(
          join(__dirname, "fixtures/by-name-proxy-simple/index.ts"),
          {
            experimental: { disableExperimentalWarning: true },
          },
        );
      });

      afterEach(async () => {
        await worker.stop();
      });

      it("should work with byName", async () => {
        const resp = await worker.fetch("/simple");
        expect(resp.status).toBe(200);
        expect(await resp.text()).toBe("Hello, Hono DO!");
      });
    });

    describe("Dynamic", () => {
      let worker: UnstableDevWorker;

      beforeEach(async () => {
        worker = await unstable_dev(
          join(__dirname, "fixtures/by-name-proxy-dynamic/index.ts"),
          {
            experimental: { disableExperimentalWarning: true },
          },
        );
      });

      afterEach(async () => {
        await worker.stop();
      });

      it("should work with byName", async () => {
        const roomId = Array.from({ length: 10 }).map(() =>
          Math.random().toString(36).slice(2),
        );

        for (const id of roomId) {
          const resp = await worker.fetch(`/room/${id}`);
          expect(resp.status).toBe(200);
          expect(await resp.text()).toBe(id);
        }
      });
    });
  });
});
