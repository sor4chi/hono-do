import { Context } from './context';
import type { ExecutionContext } from './context';
import type { Router } from './router';
import type { Env, ErrorHandler, H, HandlerInterface, MiddlewareHandlerInterface, NotFoundHandler, OnHandlerInterface, MergePath, MergeSchemaPath, FetchEventLike, Schema } from './types';
import type { RemoveBlankRecord } from './utils/types';
interface RouterRoute {
    path: string;
    method: string;
    handler: H;
}
declare const Hono_base: new <E_1 extends Env = Env, S_1 extends Schema = {}, BasePath_1 extends string = "/">() => {
    all: HandlerInterface<E_1, "all", S_1, BasePath_1>;
    options: HandlerInterface<E_1, "options", S_1, BasePath_1>;
    get: HandlerInterface<E_1, "get", S_1, BasePath_1>;
    post: HandlerInterface<E_1, "post", S_1, BasePath_1>;
    put: HandlerInterface<E_1, "put", S_1, BasePath_1>;
    delete: HandlerInterface<E_1, "delete", S_1, BasePath_1>;
    patch: HandlerInterface<E_1, "patch", S_1, BasePath_1>;
} & {
    on: OnHandlerInterface<E_1, S_1, BasePath_1>;
} & {
    use: MiddlewareHandlerInterface<E_1, S_1, BasePath_1>;
};
declare class Hono<E extends Env = Env, S extends Schema = {}, BasePath extends string = '/'> extends Hono_base<E, S, BasePath> {
    router: Router<H>;
    readonly getPath: (request: Request, options?: {
        env?: E['Bindings'];
    }) => string;
    private _basePath;
    private path;
    routes: RouterRoute[];
    constructor(init?: Partial<Pick<Hono, 'router' | 'getPath'> & {
        strict: boolean;
    }>);
    private clone;
    private notFoundHandler;
    private errorHandler;
    route<SubPath extends string, SubEnv extends Env, SubSchema extends Schema, SubBasePath extends string>(path: SubPath, app: Hono<SubEnv, SubSchema, SubBasePath>): Hono<E, MergeSchemaPath<SubSchema, MergePath<BasePath, SubPath>> & S, BasePath>;
    /** @description
     * Use `basePath` instead of `route` when passing **one** argument, such as `app.route('/api')`.
     * The use of `route` with **one** argument has been removed in v4.
     * However, you can still use `route` with **two** arguments, like `app.route('/api', subApp)`."
     */
    route<SubPath extends string>(path: SubPath): Hono<E, RemoveBlankRecord<S>, BasePath>;
    basePath<SubPath extends string>(path: SubPath): Hono<E, S, MergePath<BasePath, SubPath>>;
    onError(handler: ErrorHandler<E>): this;
    notFound(handler: NotFoundHandler<E>): this;
    showRoutes(): void;
    /**
     * @experimental
     * `app.mount()` is an experimental feature.
     * The API might be changed.
     */
    mount(path: string, applicationHandler: (request: Request, ...args: any) => Response | Promise<Response>, optionHandler?: (c: Context) => unknown): Hono<E, S, BasePath>;
    get routerName(): string;
    /**
     * @deprecate
     * `app.head()` is no longer used.
     * `app.get()` implicitly handles the HEAD method.
     */
    head: () => this;
    private addRoute;
    private matchRoute;
    private handleError;
    private dispatch;
    /**
     * @deprecate
     * `app.handleEvent()` will be removed in v4.
     * Use `app.fetch()` instead of `app.handleEvent()`.
     */
    handleEvent: (event: FetchEventLike) => Response | Promise<Response>;
    fetch: (request: Request, Env?: E['Bindings'] | {}, executionCtx?: ExecutionContext) => Response | Promise<Response>;
    request: (input: Request | string | URL, requestInit?: RequestInit) => Response | Promise<Response>;
    fire: () => void;
}
export { Hono as HonoBase };
