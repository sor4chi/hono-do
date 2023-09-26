import { HonoBase } from './hono-base';
import type { Env, Schema } from './types';
export declare class Hono<E extends Env = Env, S extends Schema = {}, BasePath extends string = '/'> extends HonoBase<E, S, BasePath> {
    constructor(init?: Partial<Pick<Hono, 'router' | 'getPath'> & {
        strict: boolean;
    }>);
}
