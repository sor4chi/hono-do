export declare const METHOD_NAME_ALL: "ALL";
export declare const METHOD_NAME_ALL_LOWERCASE: "all";
export declare const METHODS: readonly ["get", "post", "put", "delete", "options", "patch"];
export interface Router<T> {
    name: string;
    add(method: string, path: string, handler: T): void;
    match(method: string, path: string): Result<T> | null;
}
export interface Result<T> {
    handlers: T[];
    params: Record<string, string>;
}
export declare class UnsupportedPathError extends Error {
}
