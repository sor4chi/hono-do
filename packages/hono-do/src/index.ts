import { Env, Hono, Schema } from "hono";

export interface HonoObjectVars {}

interface HonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> {
  app: Hono<E, S, BasePath>;
  state: DurableObjectState;
  vars: HonoObjectVars;
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
    vars: HonoObjectVars,
  ) => void | Promise<void>,
  alarm?: (
    state: DurableObjectState,
    vars: HonoObjectVars,
  ) => void | Promise<void>,
) {
  const honoObject = function (
    this: HonoObject<E, S, BasePath>,
    state: DurableObjectState,
  ) {
    const app = new Hono<E, S, BasePath>().basePath(basePath);
    this.app = app;
    this.state = state;
    this.vars = {};
    state.blockConcurrencyWhile(async () => {
      await cb(app, state, this.vars);
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
      await alarm(this.state, this.vars);
    }
  };

  return honoObject;
}
