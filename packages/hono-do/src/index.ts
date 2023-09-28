import { Env, Hono, Schema } from "hono";

interface HonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> {
  app: Hono<E, S, BasePath>;
  state: DurableObjectState;
}

export function generateHonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
>(
  basePath: string,
  cb: (
    app: Hono<E, S, BasePath>,
    state: DurableObjectState,
  ) => void | Promise<void>,
  alarm?: (state: DurableObjectState) => void | Promise<void>,
) {
  const honoObject = function (
    this: HonoObject<E, S, BasePath>,
    state: DurableObjectState,
  ) {
    const app = new Hono<E, S, BasePath>().basePath(basePath);
    this.app = app;
    this.state = state;
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

  honoObject.prototype.alarm = async function (
    this: HonoObject<E, S, BasePath>,
  ) {
    if (alarm) {
      await alarm(this.state);
    }
  };

  return honoObject;
}
