import type { ParamMap, Context } from './node';
import { Node } from './node';
export type { ParamMap } from './node';
export declare type ReplacementMap = number[];
export declare class Trie {
    context: Context;
    root: Node;
    insert(path: string, index: number, pathErrorCheckOnly: boolean): ParamMap;
    buildRegExp(): [RegExp, ReplacementMap, ReplacementMap];
}
