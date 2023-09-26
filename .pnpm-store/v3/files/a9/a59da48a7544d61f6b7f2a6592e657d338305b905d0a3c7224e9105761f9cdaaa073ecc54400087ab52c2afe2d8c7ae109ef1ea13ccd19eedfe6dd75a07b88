import type { Context } from './context';
import type { Hono } from './hono';
import type { StatusCode } from './utils/http-status';
import type { UnionToIntersection } from './utils/types';
export declare type Bindings = Record<string, unknown>;
export declare type Variables = Record<string, unknown>;
export declare type Env = {
    Bindings?: Bindings;
    Variables?: Variables;
};
export declare type Next = () => Promise<void>;
export declare type Input = {
    in?: Partial<ValidationTargets>;
    out?: Partial<{
        [K in keyof ValidationTargets]: unknown;
    }>;
};
declare type HandlerResponse<O> = Response | TypedResponse<O> | Promise<Response | TypedResponse<O>>;
export declare type Handler<E extends Env = any, P extends string = any, I extends Input = Input, R extends HandlerResponse<any> = any> = (c: Context<E, P, I>, next: Next) => R;
export declare type MiddlewareHandler<E extends Env = any, P extends string = any, I extends Input = {}> = (c: Context<E, P, I>, next: Next) => Promise<Response | void>;
export declare type H<E extends Env = any, P extends string = any, I extends Input = {}, E2 extends Env = E, R extends HandlerResponse<any> = any> = Handler<E2, P, I, R> | MiddlewareHandler<E2, P, I>;
export declare type NotFoundHandler<E extends Env = any> = (c: Context<E>) => Response | Promise<Response>;
export declare type ErrorHandler<E extends Env = any> = (err: Error, c: Context<E>) => Response | Promise<Response>;
export interface HandlerInterface<E extends Env = Env, M extends string = any, S extends Schema = {}, BasePath extends string = '/'> {
    <P extends string = ExtractKey<S> extends never ? BasePath : ExtractKey<S>, I extends Input = {}, R extends HandlerResponse<any> = any, Temp extends Env = E>(handler: H<E, P, I, Temp, R>): Hono<E, S & ToSchema<M, P, I['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string = ExtractKey<S> extends never ? BasePath : ExtractKey<S>, I extends Input = {}, R extends HandlerResponse<any> = any, E2 extends Env = E, E3 extends Env = E, Temp extends Env = E & E2>(...handlers: [H<E2, P, I, E2, R>, H<E3, P, I, Temp, R>]): Hono<E, S & ToSchema<M, P, I['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string = ExtractKey<S> extends never ? BasePath : ExtractKey<S>, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E, Temp extends Env = E & E2 & E3>(...handlers: [H<E2, P, I, E2, R>, H<E3, P, I2, E3, R>, H<E4, P, I3, Temp, R>]): Hono<E, S & ToSchema<M, P, I3['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string = ExtractKey<S> extends never ? BasePath : ExtractKey<S>, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, I4 extends Input = I & I2 & I3, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E, E5 extends Env = E, Temp extends Env = E & E2 & E3 & E4>(...handlers: [
        H<E2, P, I, E2, R>,
        H<E3, P, I2, E3, R>,
        H<E4, P, I3, E4, R>,
        H<E5, P, I3, Temp, R>
    ]): Hono<E, S & ToSchema<M, P, I4['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string = ExtractKey<S> extends never ? BasePath : ExtractKey<S>, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, I4 extends Input = I2 & I3, I5 extends Input = I & I2 & I3 & I4, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E, E5 extends Env = E, E6 extends Env = E, Temp extends Env = E & E2 & E3 & E4 & E5>(...handlers: [
        H<E2, P, I, E2, R>,
        H<E3, P, I2, E3, R>,
        H<E4, P, I3, E4, R>,
        H<E5, P, I3, E5, R>,
        H<E6, P, I3, Temp, R>
    ]): Hono<E, S & ToSchema<M, P, I5['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string = ExtractKey<S> extends never ? BasePath : ExtractKey<S>, I extends Input = {}, R extends HandlerResponse<any> = any>(...handlers: H<E, P, I, E, R>[]): Hono<E, S & ToSchema<M, P, I['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string, R extends HandlerResponse<any> = any, I extends Input = {}>(path: P): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, Temp extends Env = E>(path: P, handler: H<E, MergePath<BasePath, P>, I, Temp, R>): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, E2 extends Env = E, E3 extends Env = E, Temp extends Env = E & E2>(path: P, ...handlers: [
        H<E2, MergePath<BasePath, P>, I, E2, R>,
        H<E3, MergePath<BasePath, P>, I, Temp, R>
    ]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E, Temp extends Env = E & E2 & E3>(path: P, ...handlers: [
        H<E2, MergePath<BasePath, P>, I, E2, R>,
        H<E3, MergePath<BasePath, P>, I2, E3, R>,
        H<E4, MergePath<BasePath, P>, I3, Temp, R>
    ]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I3['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, I4 extends Input = I & I2 & I3, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E, E5 extends Env = E, Temp extends Env = E & E2 & E3 & E4>(path: P, ...handlers: [
        H<E2, MergePath<BasePath, P>, I, E2, R>,
        H<E3, MergePath<BasePath, P>, I2, E3, R>,
        H<E4, MergePath<BasePath, P>, I3, E4, R>,
        H<E5, MergePath<BasePath, P>, I4, Temp, R>
    ]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I4['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, I4 extends Input = I2 & I3, I5 extends Input = I & I2 & I3 & I4, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E, E5 extends Env = E, E6 extends Env = E, Temp extends Env = E & E2 & E3 & E4 & E5>(path: P, ...handlers: [
        H<E2, MergePath<BasePath, P>, I, E2, R>,
        H<E3, MergePath<BasePath, P>, I2, E3, R>,
        H<E4, MergePath<BasePath, P>, I3, E4, R>,
        H<E5, MergePath<BasePath, P>, I4, E5, R>,
        H<E6, MergePath<BasePath, P>, I5, Temp, R>
    ]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I5['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string, I extends Input = {}, R extends HandlerResponse<any> = any>(path: P, ...handlers: H<E, MergePath<BasePath, P>, I, E, R>[]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I['in'], MergeTypedResponseData<R>>, BasePath>;
}
export interface MiddlewareHandlerInterface<E extends Env = Env, S extends Schema = {}, BasePath extends string = '/'> {
    (...handlers: MiddlewareHandler<E, MergePath<BasePath, ExtractKey<S>>>[]): Hono<E, S, BasePath>;
    <P extends string>(path: P, ...handlers: MiddlewareHandler<E, MergePath<BasePath, P>>[]): Hono<E, S, BasePath>;
}
export interface OnHandlerInterface<E extends Env = Env, S extends Schema = {}, BasePath extends string = '/'> {
    <M extends string, P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, E2 extends Env = E, E3 extends Env = E>(method: M, path: P, ...handlers: [
        H<E2, MergePath<BasePath, P>, I, E2, R>,
        H<E3, MergePath<BasePath, P>, I, E & E2, R>
    ]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I['in'], MergeTypedResponseData<R>>, BasePath>;
    <M extends string, P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E>(method: M, path: P, ...handlers: [
        H<E2, MergePath<BasePath, P>, I, E2, R>,
        H<E3, MergePath<BasePath, P>, I2, E3, R>,
        H<E4, MergePath<BasePath, P>, I3, E & E2 & E3, R>
    ]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I3['in'], MergeTypedResponseData<R>>, BasePath>;
    <M extends string, P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, I4 extends Input = I & I2 & I3, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E, E5 extends Env = E>(method: M, path: P, ...handlers: [
        H<E2, MergePath<BasePath, P>, I, E2, R>,
        H<E3, MergePath<BasePath, P>, I2, E3, R>,
        H<E4, MergePath<BasePath, P>, I3, E4, R>,
        H<E5, MergePath<BasePath, P>, I4, E & E2 & E3 & E4, R>
    ]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I4['in'], MergeTypedResponseData<R>>, BasePath>;
    <M extends string, P extends string, R extends HandlerResponse<any> = any, I extends Input = {}, I2 extends Input = I, I3 extends Input = I & I2, I4 extends Input = I & I2 & I3, I5 extends Input = I & I2 & I3 & I4, E2 extends Env = E, E3 extends Env = E, E4 extends Env = E, E5 extends Env = E, E6 extends Env = E>(method: M, path: P, ...handlers: [
        H<E2, MergePath<BasePath, P>, I, E2, R>,
        H<E3, MergePath<BasePath, P>, I2, E3, R>,
        H<E4, MergePath<BasePath, P>, I3, E4, R>,
        H<E5, MergePath<BasePath, P>, I4, E5, R>,
        H<E6, MergePath<BasePath, P>, I5, E & E2 & E3 & E4 & E5, R>
    ]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I5['in'], MergeTypedResponseData<R>>, BasePath>;
    <M extends string, P extends string, R extends HandlerResponse<any> = any, I extends Input = {}>(method: M, path: P, ...handlers: H<E, MergePath<BasePath, P>, I, E, R>[]): Hono<E, S & ToSchema<M, MergePath<BasePath, P>, I['in'], MergeTypedResponseData<R>>, BasePath>;
    <P extends string, R extends HandlerResponse<any> = any, I extends Input = {}>(methods: string[], path: P, ...handlers: H<E, MergePath<BasePath, P>, I, E, R>[]): Hono<E, S & ToSchema<string, MergePath<BasePath, P>, I['in'], MergeTypedResponseData<R>>, BasePath>;
}
declare type ExtractKey<S> = S extends Record<infer Key, unknown> ? Key extends string ? Key : never : string;
export declare type ToSchema<M extends string, P extends string, I extends Input['in'], O> = {
    [K in P]: {
        [K2 in M as AddDollar<K2>]: {
            input: unknown extends I ? AddParam<{}, P> : AddParam<I, P>;
            output: unknown extends O ? {} : O;
        };
    };
};
export declare type Schema = {
    [Path: string]: {
        [Method: `$${Lowercase<string>}`]: {
            input: Partial<ValidationTargets> & {
                param?: Record<string, string>;
            };
            output: {};
        };
    };
};
export declare type MergeSchemaPath<OrigSchema, SubPath extends string> = {
    [K in keyof OrigSchema as `${MergePath<SubPath, K & string>}`]: OrigSchema[K];
};
export declare type AddParam<I, P extends string> = ParamKeys<P> extends never ? I : I & {
    param: UnionToIntersection<ParamKeyToRecord<ParamKeys<P>>>;
};
declare type AddDollar<T extends string> = `$${Lowercase<T>}`;
export declare type MergePath<A extends string, B extends string> = A extends '' ? B : A extends '/' ? B : A extends `${infer P}/` ? B extends `/${infer Q}` ? `${P}/${Q}` : `${P}/${B}` : B extends `/${infer Q}` ? Q extends '' ? A : `${A}/${Q}` : `${A}/${B}`;
export declare type TypedResponse<T = unknown> = {
    response: Response | Promise<Response>;
    data: T;
    format: 'json';
    status: StatusCode;
};
declare type ExtractResponseData<T> = T extends Promise<infer T2> ? T2 extends TypedResponse<infer U> ? U : never : T extends TypedResponse<infer U> ? U : never;
declare type MergeTypedResponseData<T> = UnionToIntersection<ExtractResponseData<T>>;
export declare type ValidationTargets = {
    json: any;
    form: Record<string, string | File>;
    query: Record<string, string | string[]>;
    queries: Record<string, string[]>;
    param: Record<string, string>;
    header: Record<string, string>;
    cookie: Record<string, string>;
};
declare type ParamKeyName<NameWithPattern> = NameWithPattern extends `${infer Name}{${infer _Pattern}` ? Name : NameWithPattern;
declare type ParamKey<Component> = Component extends `:${infer NameWithPattern}` ? ParamKeyName<NameWithPattern> : never;
export declare type ParamKeys<Path> = Path extends `${infer Component}/${infer Rest}` ? ParamKey<Component> | ParamKeys<Rest> : ParamKey<Path>;
export declare type ParamKeyToRecord<T extends string> = T extends `${infer R}?` ? Record<R, string | undefined> : {
    [K in T]: string;
};
export declare type InputToDataByTarget<T extends Input['out'], Target extends keyof ValidationTargets> = T extends {
    [K in Target]: infer R;
} ? R : never;
export declare type RemoveQuestion<T> = T extends `${infer R}?` ? R : T;
export declare type UndefinedIfHavingQuestion<T> = T extends `${infer _}?` ? string | undefined : string;
export declare type ExtractSchema<T> = UnionToIntersection<T extends Hono<infer _, infer S, any> ? S : never>;
export declare abstract class FetchEventLike {
    abstract readonly request: Request;
    abstract respondWith(promise: Response | Promise<Response>): void;
    abstract passThroughOnException(): void;
    abstract waitUntil(promise: Promise<void>): void;
}
export {};
