import type { Context } from '../../context';
import type { Next } from '../../types';
export declare type ServeStaticOptions = {
    root?: string;
    path?: string;
    rewriteRequestPath?: (path: string) => string;
};
export declare const serveStatic: (options?: ServeStaticOptions) => (c: Context, next: Next) => Promise<void | Response>;
