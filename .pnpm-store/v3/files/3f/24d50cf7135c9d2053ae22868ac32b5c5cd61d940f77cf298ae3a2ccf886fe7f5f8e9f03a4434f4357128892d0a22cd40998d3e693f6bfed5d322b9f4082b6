import type { Hono } from '../hono';
import type { Schema } from '../types';
import type { RemoveBlankRecord } from '../utils/types';
export declare type ClientRequestOptions = {
    headers?: Record<string, string>;
    fetch?: typeof fetch;
};
declare type ClientRequest<S extends Schema> = {
    [M in keyof S]: S[M] extends {
        input: infer R;
        output: infer O;
    } ? RemoveBlankRecord<R> extends never ? (args?: {}, options?: ClientRequestOptions) => Promise<ClientResponse<O>> : (args: Omit<R, 'header' | 'cookie'>, options?: ClientRequestOptions) => Promise<ClientResponse<O>> : never;
} & {
    $url: () => URL;
};
declare type BlankRecordToNever<T> = T extends Record<infer R, unknown> ? R extends never ? never : T : never;
export interface ClientResponse<T> {
    ok: boolean;
    status: number;
    statusText: string;
    headers: Headers;
    url: string;
    redirect(url: string, status: number): Response;
    clone(): Response;
    json(): Promise<BlankRecordToNever<T>>;
    text(): Promise<string>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    arrayBuffer(): Promise<ArrayBuffer>;
}
export interface Response extends ClientResponse<unknown> {
}
export declare type Fetch<T> = (args?: InferRequestType<T>, opt?: ClientRequestOptions) => Promise<ClientResponse<InferResponseType<T>>>;
export declare type InferResponseType<T> = T extends (args: any | undefined) => Promise<ClientResponse<infer O>> ? O : never;
export declare type InferRequestType<T> = T extends (args: infer R) => Promise<ClientResponse<unknown>> ? NonNullable<R> : never;
declare type PathToChain<Path extends string, E extends Schema, Original extends string = ''> = Path extends `/${infer P}` ? PathToChain<P, E, Path> : Path extends `${infer P}/${infer R}` ? {
    [K in P]: PathToChain<R, E, Original>;
} : {
    [K in Path extends '' ? 'index' : Path]: ClientRequest<E extends Record<string, unknown> ? E[Original] : never>;
};
export declare type Client<T> = T extends Hono<any, infer S, any> ? S extends Record<infer K, Schema> ? K extends string ? PathToChain<K, S> : never : never : never;
export declare type Callback = (opts: CallbackOptions) => unknown;
interface CallbackOptions {
    path: string[];
    args: any[];
}
export declare type ObjectType<T = unknown> = {
    [key: string]: T;
};
export {};
