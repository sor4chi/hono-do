import { Env, Hono, Schema } from "hono";

import type { MergePath } from "hono/dist/types/types";

interface HonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> {
  app: HonoWithWebsocket<E, S, BasePath>;
}

type HonoInit = ConstructorParameters<typeof Hono>[0];

class HonoWithWebsocket<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> extends Hono<E, S, BasePath> {
  constructor(init?: HonoInit) {
    super(init);
  }

  ws(
    path: string,
    cb: (handler: {
      onMessage: (cb: (msg: string) => void) => void;
      onReceive: (cb: (msg: ArrayBuffer | string) => void) => void;
      session: WebSocket;
    }) => void | Promise<void>,
  ) {
    this.get(path, async (c) => {
      if (c.req.header("Upgrade") === "websocket") {
        const { 0: client, 1: server } = new WebSocketPair();
        server.accept();
        await cb({
          onMessage: (cb) => {
            server.addEventListener("message", (msg) => {
              if (typeof msg.data === "string") cb(msg.data);
            });
          },
          onReceive: (cb) => {
            server.addEventListener("message", (msg) => {
              cb(msg.data);
            });
          },
          session: server,
        });
        return new Response(null, { status: 101, webSocket: client });
      }
      return c.text("Not found", 404);
    });
    return this;
  }

  basePath<SubPath extends string>(
    path: SubPath,
  ): HonoWithWebsocket<E, S, MergePath<BasePath, SubPath>> {
    return new HonoWithWebsocket<E, S, MergePath<BasePath, SubPath>>(
      super.basePath(path),
    );
  }
}

export function generateHonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
>(
  basePath: string,
  cb: (
    app: HonoWithWebsocket<E, S, BasePath>,
    state: DurableObjectState,
  ) => void,
) {
  const honoObject = function (
    this: HonoObject<E, S, BasePath>,
    state: DurableObjectState,
  ) {
    const app = new HonoWithWebsocket<E, S, BasePath>().basePath(basePath);
    this.app = app;
    state.blockConcurrencyWhile(async () => {
      await cb(app, state);
    });
  };

  honoObject.prototype.fetch = function (
    this: HonoObject<E, S, BasePath>,
    request: Request,
  ) {
    return this.app.fetch(request);
  };

  return honoObject;
}
