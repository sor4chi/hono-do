import type { KVNamespace } from '@cloudflare/workers-types';
import type { MiddlewareHandler } from '../../types';
export declare type ServeStaticOptions = {
    root?: string;
    path?: string;
    manifest?: object | string;
    namespace?: KVNamespace;
    rewriteRequestPath?: (path: string) => string;
};
export declare const serveStatic: (options?: ServeStaticOptions) => MiddlewareHandler;
