import type { Hono } from '../../hono';
import type { Env, Schema } from '../../types';
import type { ApiGatewayRequestContext, LambdaFunctionUrlRequestContext } from './custom-context';
interface APIGatewayProxyEventV2 {
    httpMethod: string;
    headers: Record<string, string | undefined>;
    rawPath: string;
    rawQueryString: string;
    body: string | null;
    isBase64Encoded: boolean;
    requestContext: ApiGatewayRequestContext;
}
interface APIGatewayProxyEvent {
    httpMethod: string;
    headers: Record<string, string | undefined>;
    path: string;
    body: string | null;
    isBase64Encoded: boolean;
    queryStringParameters?: Record<string, string | undefined>;
    requestContext: ApiGatewayRequestContext;
}
interface LambdaFunctionUrlEvent {
    headers: Record<string, string | undefined>;
    rawPath: string;
    rawQueryString: string;
    body: string | null;
    isBase64Encoded: boolean;
    requestContext: LambdaFunctionUrlRequestContext;
}
interface APIGatewayProxyResult {
    statusCode: number;
    body: string;
    headers: Record<string, string>;
    isBase64Encoded: boolean;
}
/**
 * Accepts events from API Gateway/ELB(`APIGatewayProxyEvent`) and directly through Function Url(`APIGatewayProxyEventV2`)
 */
export declare const handle: <E extends Env = Env, S extends Schema = {}, BasePath extends string = "/">(app: Hono<E, S, BasePath>) => (event: APIGatewayProxyEvent | APIGatewayProxyEventV2 | LambdaFunctionUrlEvent) => Promise<APIGatewayProxyResult>;
export declare const isContentTypeBinary: (contentType: string) => boolean;
export declare const isContentEncodingBinary: (contentEncoding: string | null) => boolean;
export {};
