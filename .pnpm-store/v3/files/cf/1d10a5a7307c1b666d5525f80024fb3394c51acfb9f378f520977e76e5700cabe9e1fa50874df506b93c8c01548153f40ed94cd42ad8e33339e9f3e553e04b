"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var hono_base_exports = {};
__export(hono_base_exports, {
  HonoBase: () => Hono
});
module.exports = __toCommonJS(hono_base_exports);
var import_compose = require("./compose");
var import_context = require("./context");
var import_http_exception = require("./http-exception");
var import_request = require("./request");
var import_router = require("./router");
var import_url = require("./utils/url");
function defineDynamicClass() {
  return class {
  };
}
const notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
const errorHandler = (err, c) => {
  if (err instanceof import_http_exception.HTTPException) {
    return err.getResponse();
  }
  console.trace(err);
  const message = "Internal Server Error";
  return c.text(message, 500);
};
class Hono extends defineDynamicClass() {
  constructor(init = {}) {
    super();
    this._basePath = "/";
    this.path = "/";
    this.routes = [];
    this.notFoundHandler = notFoundHandler;
    this.errorHandler = errorHandler;
    this.head = () => {
      console.warn("`app.head()` is no longer used. `app.get()` implicitly handles the HEAD method.");
      return this;
    };
    this.handleEvent = (event) => {
      return this.dispatch(event.request, event, void 0, event.request.method);
    };
    this.fetch = (request, Env, executionCtx) => {
      return this.dispatch(request, executionCtx, Env, request.method);
    };
    this.request = (input, requestInit) => {
      if (input instanceof Request) {
        if (requestInit !== void 0) {
          input = new Request(input, requestInit);
        }
        return this.fetch(input);
      }
      input = input.toString();
      const path = /^https?:\/\//.test(input) ? input : `http://localhost${(0, import_url.mergePath)("/", input)}`;
      const req = new Request(path, requestInit);
      return this.fetch(req);
    };
    this.fire = () => {
      addEventListener("fetch", (event) => {
        event.respondWith(this.dispatch(event.request, event, void 0, event.request.method));
      });
    };
    const allMethods = [...import_router.METHODS, import_router.METHOD_NAME_ALL_LOWERCASE];
    allMethods.map((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.path = args1;
        } else {
          this.addRoute(method, this.path, args1);
        }
        args.map((handler) => {
          if (typeof handler !== "string") {
            this.addRoute(method, this.path, handler);
          }
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      if (!method)
        return this;
      this.path = path;
      for (const m of [method].flat()) {
        handlers.map((handler) => {
          this.addRoute(m.toUpperCase(), this.path, handler);
        });
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.path = arg1;
      } else {
        handlers.unshift(arg1);
      }
      handlers.map((handler) => {
        this.addRoute(import_router.METHOD_NAME_ALL, this.path, handler);
      });
      return this;
    };
    const strict = init.strict ?? true;
    delete init.strict;
    Object.assign(this, init);
    this.getPath = strict ? init.getPath ?? import_url.getPath : import_url.getPathNoStrict;
  }
  clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.routes = this.routes;
    return clone;
  }
  route(path, app) {
    const subApp = this.basePath(path);
    if (!app) {
      return subApp;
    }
    app.routes.map((r) => {
      const handler = app.errorHandler === errorHandler ? r.handler : async (c, next) => (await (0, import_compose.compose)([r.handler], app.errorHandler)(c, next)).res;
      subApp.addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.clone();
    subApp._basePath = (0, import_url.mergePath)(this._basePath, path);
    return subApp;
  }
  onError(handler) {
    this.errorHandler = handler;
    return this;
  }
  notFound(handler) {
    this.notFoundHandler = handler;
    return this;
  }
  showRoutes() {
    const length = 8;
    this.routes.map((route) => {
      console.log(
        `\x1B[32m${route.method}\x1B[0m ${" ".repeat(length - route.method.length)} ${route.path}`
      );
    });
  }
  mount(path, applicationHandler, optionHandler) {
    const mergedPath = (0, import_url.mergePath)(this._basePath, path);
    const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
    const handler = async (c, next) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      const options = optionHandler ? optionHandler(c) : [c.env, executionContext];
      const optionsArray = Array.isArray(options) ? options : [options];
      const queryStrings = (0, import_url.getQueryStrings)(c.req.url);
      const res = await applicationHandler(
        new Request(
          new URL((c.req.path.slice(pathPrefixLength) || "/") + queryStrings, c.req.url),
          c.req.raw
        ),
        ...optionsArray
      );
      if (res)
        return res;
      await next();
    };
    this.addRoute(import_router.METHOD_NAME_ALL, (0, import_url.mergePath)(path, "*"), handler);
    return this;
  }
  get routerName() {
    this.matchRoute("GET", "/");
    return this.router.name;
  }
  addRoute(method, path, handler) {
    method = method.toUpperCase();
    if (this._basePath) {
      path = (0, import_url.mergePath)(this._basePath, path);
    }
    this.router.add(method, path, handler);
    const r = { path, method, handler };
    this.routes.push(r);
  }
  matchRoute(method, path) {
    return this.router.match(method, path) || { handlers: [], params: {} };
  }
  handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  dispatch(request, executionCtx, env, method) {
    const path = this.getPath(request, { env });
    if (method === "HEAD") {
      return (async () => new Response(null, await this.dispatch(request, executionCtx, env, "GET")))();
    }
    const { handlers, params } = this.matchRoute(method, path);
    const c = new import_context.Context(new import_request.HonoRequest(request, path, params), {
      env,
      executionCtx,
      notFoundHandler: this.notFoundHandler
    });
    if (handlers.length === 1) {
      let res;
      try {
        res = handlers[0](c, async () => {
        });
        if (!res) {
          return this.notFoundHandler(c);
        }
      } catch (err) {
        return this.handleError(err, c);
      }
      if (res.constructor.name === "Response")
        return res;
      if ("response" in res) {
        res = res.response;
      }
      if (res.constructor.name === "Response")
        return res;
      return (async () => {
        let awaited;
        try {
          awaited = await res;
          if (awaited !== void 0 && "response" in awaited) {
            awaited = awaited["response"];
          }
          if (!awaited) {
            return this.notFoundHandler(c);
          }
        } catch (err) {
          return this.handleError(err, c);
        }
        return awaited;
      })();
    }
    const composed = (0, import_compose.compose)(handlers, this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const tmp = composed(c);
        const context = tmp.constructor.name === "Promise" ? await tmp : tmp;
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. You may forget returning Response object or `await next()`"
          );
        }
        return context.res;
      } catch (err) {
        return this.handleError(err, c);
      }
    })();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HonoBase
});
