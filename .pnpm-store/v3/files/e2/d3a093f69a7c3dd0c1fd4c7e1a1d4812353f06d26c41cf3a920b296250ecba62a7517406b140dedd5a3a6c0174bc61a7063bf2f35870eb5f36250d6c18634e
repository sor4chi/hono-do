import type { HonoRequest } from './request';
import { FetchEventLike } from './types';
import type { Env, NotFoundHandler, Input, TypedResponse } from './types';
import type { CookieOptions } from './utils/cookie';
import type { StatusCode } from './utils/http-status';
import type { JSONValue, InterfaceToType } from './utils/types';
declare type Runtime = 'node' | 'deno' | 'bun' | 'workerd' | 'fastly' | 'edge-light' | 'lagon' | 'other';
declare type HeaderRecord = Record<string, string | string[]>;
declare type Data = string | ArrayBuffer | ReadableStream;
export interface ExecutionContext {
    waitUntil(promise: Promise<unknown>): void;
    passThroughOnException(): void;
}
export interface ContextVariableMap {
}
export interface ContextRenderer {
}
interface DefaultRenderer {
    (content: string): Response | Promise<Response>;
}
declare type Renderer = ContextRenderer extends Function ? ContextRenderer : DefaultRenderer;
interface Get<E extends Env> {
    <Key extends keyof ContextVariableMap>(key: Key): ContextVariableMap[Key];
    <Key extends keyof E['Variables']>(key: Key): E['Variables'][Key];
}
interface Set<E extends Env> {
    <Key extends keyof ContextVariableMap>(key: Key, value: ContextVariableMap[Key]): void;
    <Key extends keyof E['Variables']>(key: Key, value: E['Variables'][Key]): void;
}
interface NewResponse {
    (data: Data | null, status?: StatusCode, headers?: HeaderRecord): Response;
    (data: Data | null, init?: ResponseInit): Response;
}
interface BodyRespond extends NewResponse {
}
interface TextRespond {
    (text: string, status?: StatusCode, headers?: HeaderRecord): Response;
    (text: string, init?: ResponseInit): Response;
}
interface JSONRespond {
    <T = JSONValue>(object: T, status?: StatusCode, headers?: HeaderRecord): Response;
    <T = JSONValue>(object: T, init?: ResponseInit): Response;
}
interface JSONTRespond {
    <T>(object: InterfaceToType<T> extends JSONValue ? T : JSONValue, status?: StatusCode, headers?: HeaderRecord): TypedResponse<InterfaceToType<T> extends JSONValue ? JSONValue extends InterfaceToType<T> ? never : T : never>;
    <T>(object: InterfaceToType<T> extends JSONValue ? T : JSONValue, init?: ResponseInit): TypedResponse<InterfaceToType<T> extends JSONValue ? JSONValue extends InterfaceToType<T> ? never : T : never>;
}
interface HTMLRespond {
    (html: string, status?: StatusCode, headers?: HeaderRecord): Response;
    (html: string, init?: ResponseInit): Response;
}
declare type ContextOptions<E extends Env> = {
    env: E['Bindings'];
    executionCtx?: FetchEventLike | ExecutionContext | undefined;
    notFoundHandler?: NotFoundHandler<E>;
};
export declare class Context<E extends Env = any, P extends string = any, I extends Input = {}> {
    req: HonoRequest<P, I['out']>;
    env: E['Bindings'];
    private _var;
    finalized: boolean;
    error: Error | undefined;
    private _status;
    private _exCtx;
    private _h;
    private _pH;
    private _res;
    private _init;
    private _renderer;
    private notFoundHandler;
    constructor(req: HonoRequest<P, I['out']>, options?: ContextOptions<E>);
    get event(): FetchEventLike;
    get executionCtx(): ExecutionContext;
    get res(): Response;
    set res(_res: Response | undefined);
    /**
     * @experimental
     * `c.render()` is an experimental feature.
     * The API might be changed.
     */
    render: Renderer;
    /**
     * @experimental
     * `c.setRenderer()` is an experimental feature.
     * The API might be changed.
     */
    setRenderer: (renderer: Renderer) => void;
    header: (name: string, value: string | undefined, options?: {
        append?: boolean;
    }) => void;
    status: (status: StatusCode) => void;
    set: Set<E>;
    get: Get<E>;
    get var(): Readonly<E['Variables']>;
    newResponse: NewResponse;
    body: BodyRespond;
    text: TextRespond;
    json: JSONRespond;
    jsonT: JSONTRespond;
    html: HTMLRespond;
    redirect: (location: string, status?: StatusCode) => Response;
    /** @deprecated
     * Use Cookie Middleware instead of `c.cookie()`. The `c.cookie()` will be removed in v4.
     *
     * @example
     *
     * import { setCookie } from 'hono/cookie'
     * // ...
     * app.get('/', (c) => {
     *   setCookie(c, 'key', 'value')
     *   //...
     * })
     */
    cookie: (name: string, value: string, opt?: CookieOptions) => void;
    notFound: () => Response | Promise<Response>;
    /** @deprecated
     * Use `getRuntimeKey()` exported from `hono/adapter` instead of `c.runtime()`. The `c.runtime()` will be removed in v4.
     *
     * @example
     *
     * import { getRuntimeKey } from 'hono/adapter'
     * // ...
     * app.get('/', (c) => {
     *   const key = getRuntimeKey()
     *   //...
     * })
     */
    get runtime(): Runtime;
}
export {};
