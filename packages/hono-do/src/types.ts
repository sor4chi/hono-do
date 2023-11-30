import { Env, Hono, Schema } from "hono";

import { MergeArray } from "./utils";

export interface HonoObjectVars {}

interface HonoObjectState<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> {
  app: Hono<E, S, BasePath>;
  state: DurableObjectState;
  vars: HonoObjectVars;
}

export interface HonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> extends HonoObjectState<E, S, BasePath> {
  (this: HonoObject<E, S, BasePath>, state: DurableObjectState): void;
  alarm: (handler: AlarmHandler) => HonoObject<E, S, BasePath>;
  webSocketMessage: (
    handler: WebSocketMessageHandler,
  ) => HonoObject<E, S, BasePath>;
  webSocketClose: (
    handler: WebSocketCloseHandler,
  ) => HonoObject<E, S, BasePath>;
  webSocketError: (
    handler: WebSocketErrorHandler,
  ) => HonoObject<E, S, BasePath>;
}

export type AlarmHandler = (
  ...args: MergeArray<
    Parameters<NonNullable<DurableObject["alarm"]>>,
    [state: DurableObjectState, vars: HonoObjectVars]
  >
) => ReturnType<NonNullable<DurableObject["alarm"]>>;

export type WebSocketMessageHandler = (
  ...args: MergeArray<
    Parameters<NonNullable<DurableObject["webSocketMessage"]>>,
    [state: DurableObjectState, vars: HonoObjectVars]
  >
) => ReturnType<NonNullable<DurableObject["webSocketMessage"]>>;

export type WebSocketCloseHandler = (
  ...args: MergeArray<
    Parameters<NonNullable<DurableObject["webSocketClose"]>>,
    [state: DurableObjectState, vars: HonoObjectVars]
  >
) => ReturnType<NonNullable<DurableObject["webSocketClose"]>>;

export type WebSocketErrorHandler = (
  ...args: MergeArray<
    Parameters<NonNullable<DurableObject["webSocketError"]>>,
    [state: DurableObjectState, vars: HonoObjectVars]
  >
) => ReturnType<NonNullable<DurableObject["webSocketError"]>>;

export interface HonoObjectHandlers {
  alarm?: AlarmHandler;
  webSocketMessage?: WebSocketMessageHandler;
  webSocketClose?: WebSocketCloseHandler;
  webSocketError?: WebSocketErrorHandler;
}
