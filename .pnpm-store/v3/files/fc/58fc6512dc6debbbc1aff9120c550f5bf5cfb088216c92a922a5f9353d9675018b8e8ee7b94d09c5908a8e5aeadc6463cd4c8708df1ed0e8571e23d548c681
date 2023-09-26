import type { MiddlewareHandler } from '../../types';
import '../../context';
declare module '../../context' {
    interface ContextVariableMap {
        jwtPayload: any;
    }
}
export declare const jwt: (options: {
    secret: string;
    cookie?: string;
    alg?: string;
}) => MiddlewareHandler;
