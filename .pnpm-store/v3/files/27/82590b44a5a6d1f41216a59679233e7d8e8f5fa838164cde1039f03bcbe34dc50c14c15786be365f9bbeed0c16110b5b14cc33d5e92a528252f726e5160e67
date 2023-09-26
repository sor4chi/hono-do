import type { Hono } from '../../hono';
interface CloudFrontHeader {
    key: string;
    value: string;
}
interface CloudFrontHeaders {
    [name: string]: CloudFrontHeader[];
}
interface CloudFrontCustomOrigin {
    customHeaders: CloudFrontHeaders;
    domainName: string;
    keepaliveTimeout: number;
    path: string;
    port: number;
    protocol: string;
    readTimeout: number;
    sslProtocols: string[];
}
export interface CloudFrontRequest {
    clientIp: string;
    headers: CloudFrontHeaders;
    method: string;
    querystring: string;
    uri: string;
    body?: {
        inputTruncated: boolean;
        action: string;
        encoding: string;
        data: string;
    };
    origin?: {
        custom: CloudFrontCustomOrigin;
    };
}
export interface CloudFrontResponse {
    headers: CloudFrontHeaders;
    status: string;
    statusDescription?: string;
}
export interface CloudFrontConfig {
    distributionDomainName: string;
    distributionId: string;
    eventType: string;
    requestId: string;
}
interface CloudFrontEvent {
    cf: {
        config: CloudFrontConfig;
        request: CloudFrontRequest;
        response?: CloudFrontResponse;
    };
}
export interface CloudFrontEdgeEvent {
    Records: CloudFrontEvent[];
}
declare type CloudFrontContext = {};
export interface Callback {
    (err: Error | null, result?: CloudFrontRequest | CloudFrontResult): void;
}
interface CloudFrontResult {
    status: string;
    statusDescription?: string;
    headers?: {
        [header: string]: {
            key: string;
            value: string;
        }[];
    };
    body?: string;
    bodyEncoding?: 'text' | 'base64';
}
export declare const handle: (app: Hono<any>) => (event: CloudFrontEdgeEvent, context?: CloudFrontContext, callback?: Callback) => Promise<CloudFrontResult>;
export declare const isContentTypeBinary: (contentType: string) => boolean;
export {};
