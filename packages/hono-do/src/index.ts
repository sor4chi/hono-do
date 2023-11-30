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
    vars: HonoObjectVars,
  ) => void | Promise<void>,
  handlers: HonoObjectHandlers = {},
) {
  const _handlers: HonoObjectHandlers = {
    ...handlers,
  };

  const app = new Hono<E, S, BasePath>().basePath(basePath);

  const honoObject = function (this, state) {
    this.app = app;
    this.state = state;
    this.vars = {};
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

  const isCalledMap = new Map<string, boolean>();

  honoObject.alarm = function (handler: AlarmHandler) {
    const name = "alarm";
    if (isCalledMap.get(name)) throw Errors.handlerAlreadySet(name);
    _handlers.alarm = handler;
    isCalledMap.set(name, true);
    return honoObject;
  };

  honoObject.webSocketMessage = function (handler: WebSocketMessageHandler) {
    const name = "webSocketMessage";
    if (isCalledMap.get(name)) throw Errors.handlerAlreadySet(name);
    _handlers.webSocketMessage = handler;
    isCalledMap.set(name, true);
    return honoObject;
  };

  honoObject.webSocketClose = function (handler: WebSocketCloseHandler) {
    const name = "webSocketClose";
    if (isCalledMap.get(name)) throw Errors.handlerAlreadySet(name);
    _handlers.webSocketClose = handler;
    isCalledMap.set(name, true);
    return honoObject;
  };

  honoObject.webSocketError = function (handler: WebSocketErrorHandler) {
    const name = "webSocketError";
    if (isCalledMap.get(name)) throw Errors.handlerAlreadySet(name);
    _handlers.webSocketError = handler;
    isCalledMap.set(name, true);
    return honoObject;
  };

  return honoObject;
}

export { HonoObjectVars, HonoDOError };
