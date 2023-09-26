export declare const PATH_ERROR: unique symbol;
export declare type ParamMap = Array<[string, number]>;
export interface Context {
    varIndex: number;
}
export declare class Node {
    index?: number;
    varIndex?: number;
    children: Record<string, Node>;
    insert(tokens: readonly string[], index: number, paramMap: ParamMap, context: Context, pathErrorCheckOnly: boolean): void;
    buildRegExpStr(): string;
}
