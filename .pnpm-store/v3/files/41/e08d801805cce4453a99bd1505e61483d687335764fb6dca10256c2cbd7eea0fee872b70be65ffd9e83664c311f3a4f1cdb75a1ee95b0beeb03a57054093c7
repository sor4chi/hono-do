import type { Result, Router } from '../../router';
export declare class PatternRouter<T> implements Router<T> {
    name: string;
    private routes;
    private dNames;
    add(method: string, path: string, handler: T): void;
    match(method: string, path: string): Result<T> | null;
}
