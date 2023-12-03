import { Env, Hono, Schema } from "hono";

import { HonoDOError, Errors } from "./error";
import {
  AlarmHandler,
  WebSocketMessageHandler,
  WebSocketCloseHandler,
  WebSocketErrorHandler,
  HonoObjectHandlers,
  HonoObjectVars,
  HonoObject,
} from "./types";

export function generateHonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
>(
  basePath: BasePath,
  cb: (
    app: Hono<E, S, BasePath>,
    state: DurableObjectState,
    vars: HonoObjectVars & { env: E["Bindings"] },
  ) => void | Promise<void>,
  handlers: HonoObjectHandlers = {},
) {
  const _handlers: HonoObjectHandlers = {
    ...handlers,
  };

  const honoObject = function (this, state, env) {
    const app = new Hono<E, S, BasePath>().basePath(basePath);
    this.app = app;
    this.state = state;
    this.vars = {
      env,
    };
    state.blockConcurrencyWhile(async () => {
      await cb(app, state, this.vars);
    });
  } as HonoObject<E, S, BasePath>;

  honoObject.prototype.fetch = function (
    this: HonoObject<E, S, BasePath>,
    ...args: Parameters<NonNullable<DurableObject["fetch"]>>
  ) {
    return this.app.fetch(...args);
  };

  honoObject.prototype.alarm = async function (
    this: HonoObject<E, S, BasePath>,
  ) {
    await _handlers.alarm?.(this.state, this.vars);
  };

  honoObject.prototype.webSocketMessage = function (
    this: HonoObject<E, S, BasePath>,
    ...args: Parameters<NonNullable<DurableObject["webSocketMessage"]>>
  ) {
    _handlers.webSocketMessage?.(...args, this.state, this.vars);
  };

  honoObject.prototype.webSocketClose = function (
    this: HonoObject<E, S, BasePath>,
    ...args: Parameters<NonNullable<DurableObject["webSocketClose"]>>
  ) {
    _handlers.webSocketClose?.(...args, this.state, this.vars);
  };

  honoObject.prototype.webSocketError = function (
    this: HonoObject<E, S, BasePath>,
    ...args: Parameters<NonNullable<DurableObject["webSocketError"]>>
  ) {
    _handlers.webSocketError?.(...args, this.state, this.vars);
  };

  honoObject.alarm = function (handler: AlarmHandler) {
    if (_handlers.alarm) throw Errors.handlerAlreadySet("alarm");
    _handlers.alarm = handler;
    return honoObject;
  };

  honoObject.webSocketMessage = function (handler: WebSocketMessageHandler) {
    if (_handlers.webSocketMessage)
      throw Errors.handlerAlreadySet("webSocketMessage");
    _handlers.webSocketMessage = handler;
    return honoObject;
  };

  honoObject.webSocketClose = function (handler: WebSocketCloseHandler) {
    if (_handlers.webSocketClose)
      throw Errors.handlerAlreadySet("webSocketClose");
    _handlers.webSocketClose = handler;
    return honoObject;
  };

  honoObject.webSocketError = function (handler: WebSocketErrorHandler) {
    if (_handlers.webSocketError)
      throw Errors.handlerAlreadySet("webSocketError");
    _handlers.webSocketError = handler;
    return honoObject;
  };

  return honoObject;
}

export { HonoObjectVars, HonoDOError };
