import { Context, Env, Hono, MiddlewareHandler, Schema } from "hono";

import { MergeArray } from "./utils";

export interface HonoObjectVars {}

interface HonoObjectState<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> {
  app: Hono<E, S, BasePath>;
  state: DurableObjectState;
  vars: HonoObjectVars & {
    env: E["Bindings"];
  };
}

export interface HonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> extends HonoObjectState<E, S, BasePath> {
  (
    this: HonoObject<E, S, BasePath>,
    state: DurableObjectState,
    env: E["Bindings"],
  ): void;
  alarm: (handler: AlarmHandler<E>) => HonoObject<E, S, BasePath>;
  webSocketMessage: (
    handler: WebSocketMessageHandler<E>,
  ) => HonoObject<E, S, BasePath>;
  webSocketClose: (
    handler: WebSocketCloseHandler<E>,
  ) => HonoObject<E, S, BasePath>;
  webSocketError: (
    handler: WebSocketErrorHandler<E>,
  ) => HonoObject<E, S, BasePath>;
  byName: <
    T extends string,
    E extends {
      Bindings: { [K in T]: DurableObjectNamespace };
    },
  >(
    namespace: T,
    name: string | ((c: Context<E, BasePath>) => string | Promise<string>),
  ) => MiddlewareHandler;
}

export type AlarmHandler<E extends Env = Env> = (
  ...args: MergeArray<
    Parameters<NonNullable<DurableObject["alarm"]>>,
    [state: DurableObjectState, vars: HonoObjectVars & { env: E["Bindings"] }]
  >
) => ReturnType<NonNullable<DurableObject["alarm"]>>;

export type WebSocketMessageHandler<E extends Env = Env> = (
  ...args: MergeArray<
    Parameters<NonNullable<DurableObject["webSocketMessage"]>>,
    [state: DurableObjectState, vars: HonoObjectVars & { env: E["Bindings"] }]
  >
) => ReturnType<NonNullable<DurableObject["webSocketMessage"]>>;

export type WebSocketCloseHandler<E extends Env = Env> = (
  ...args: MergeArray<
    Parameters<NonNullable<DurableObject["webSocketClose"]>>,
    [state: DurableObjectState, vars: HonoObjectVars & { env: E["Bindings"] }]
  >
) => ReturnType<NonNullable<DurableObject["webSocketClose"]>>;

export type WebSocketErrorHandler<E extends Env = Env> = (
  ...args: MergeArray<
    Parameters<NonNullable<DurableObject["webSocketError"]>>,
    [state: DurableObjectState, vars: HonoObjectVars & { env: E["Bindings"] }]
  >
) => ReturnType<NonNullable<DurableObject["webSocketError"]>>;

export interface HonoObjectHandlers {
  alarm?: AlarmHandler;
  webSocketMessage?: WebSocketMessageHandler;
  webSocketClose?: WebSocketCloseHandler;
  webSocketError?: WebSocketErrorHandler;
}
