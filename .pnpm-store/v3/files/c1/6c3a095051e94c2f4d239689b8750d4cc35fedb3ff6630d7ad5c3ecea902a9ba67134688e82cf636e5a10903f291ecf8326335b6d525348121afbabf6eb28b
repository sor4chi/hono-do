export declare type Expect<T extends true> = T;
export declare type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
export declare type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare type RemoveBlankRecord<T> = T extends Record<infer K, unknown> ? K extends string ? T : never : never;
export declare type JSONPrimitive = string | boolean | number | null | undefined;
export declare type JSONArray = (JSONPrimitive | JSONObject | JSONArray)[];
export declare type JSONObject = {
    [key: string]: JSONPrimitive | JSONArray | JSONObject;
};
export declare type JSONValue = JSONObject | JSONArray | JSONPrimitive;
export declare type InterfaceToType<T> = T extends Function ? T : {
    [K in keyof T]: InterfaceToType<T[K]>;
};
