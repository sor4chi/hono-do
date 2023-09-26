import type { Env, NotFoundHandler, ErrorHandler } from './types';
interface ComposeContext {
    finalized: boolean;
    res: unknown;
}
export declare const compose: <C extends ComposeContext, E extends Env = Env>(middleware: Function[], onError?: ErrorHandler<E> | undefined, onNotFound?: NotFoundHandler<E> | undefined) => (context: C, next?: Function) => C | Promise<C>;
export {};
