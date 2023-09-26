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
var context_exports = {};
__export(context_exports, {
  Context: () => Context
});
module.exports = __toCommonJS(context_exports);
var import_types = require("./types");
var import_cookie = require("./utils/cookie");
class Context {
  constructor(req, options) {
    this.env = {};
    this._var = {};
    this.finalized = false;
    this.error = void 0;
    this._status = 200;
    this._h = void 0;
    this._pH = void 0;
    this._init = true;
    this._renderer = (content) => this.html(content);
    this.notFoundHandler = () => new Response();
    this.render = (...args) => this._renderer(...args);
    this.setRenderer = (renderer) => {
      this._renderer = renderer;
    };
    this.header = (name, value, options) => {
      if (value === void 0) {
        if (this._h) {
          this._h.delete(name);
        } else if (this._pH) {
          delete this._pH[name.toLocaleLowerCase()];
        }
        if (this.finalized) {
          this.res.headers.delete(name);
        }
        return;
      }
      if (options?.append) {
        if (!this._h) {
          this._init = false;
          this._h = new Headers(this._pH);
          this._pH = {};
        }
        this._h.append(name, value);
      } else {
        if (this._h) {
          this._h.set(name, value);
        } else {
          this._pH ?? (this._pH = {});
          this._pH[name.toLowerCase()] = value;
        }
      }
      if (this.finalized) {
        if (options?.append) {
          this.res.headers.append(name, value);
        } else {
          this.res.headers.set(name, value);
        }
      }
    };
    this.status = (status) => {
      this._status = status;
    };
    this.set = (key, value) => {
      this._var ?? (this._var = {});
      this._var[key] = value;
    };
    this.get = (key) => {
      return this._var ? this._var[key] : void 0;
    };
    this.newResponse = (data, arg, headers) => {
      if (this._init && !headers && !arg && this._status === 200) {
        return new Response(data, {
          headers: this._pH
        });
      }
      if (arg && typeof arg !== "number") {
        const res = new Response(data, arg);
        const contentType = this._pH?.["content-type"];
        if (contentType) {
          res.headers.set("content-type", contentType);
        }
        return res;
      }
      const status = arg ?? this._status;
      this._pH ?? (this._pH = {});
      this._h ?? (this._h = new Headers());
      for (const [k, v] of Object.entries(this._pH)) {
        this._h.set(k, v);
      }
      if (this._res) {
        this._res.headers.forEach((v, k) => {
          this._h?.set(k, v);
        });
        for (const [k, v] of Object.entries(this._pH)) {
          this._h.set(k, v);
        }
      }
      headers ?? (headers = {});
      for (const [k, v] of Object.entries(headers)) {
        if (typeof v === "string") {
          this._h.set(k, v);
        } else {
          this._h.delete(k);
          for (const v2 of v) {
            this._h.append(k, v2);
          }
        }
      }
      return new Response(data, {
        status,
        headers: this._h
      });
    };
    this.body = (data, arg, headers) => {
      return typeof arg === "number" ? this.newResponse(data, arg, headers) : this.newResponse(data, arg);
    };
    this.text = (text, arg, headers) => {
      if (!this._pH) {
        if (this._init && !headers && !arg) {
          return new Response(text);
        }
        this._pH = {};
      }
      if (this._pH["content-type"]) {
        this._pH["content-type"] = "text/plain; charset=UTF-8";
      }
      return typeof arg === "number" ? this.newResponse(text, arg, headers) : this.newResponse(text, arg);
    };
    this.json = (object, arg, headers) => {
      const body = JSON.stringify(object);
      this._pH ?? (this._pH = {});
      this._pH["content-type"] = "application/json; charset=UTF-8";
      return typeof arg === "number" ? this.newResponse(body, arg, headers) : this.newResponse(body, arg);
    };
    this.jsonT = (object, arg, headers) => {
      const response = typeof arg === "number" ? this.json(object, arg, headers) : this.json(object, arg);
      return {
        response,
        data: object,
        format: "json",
        status: response.status
      };
    };
    this.html = (html, arg, headers) => {
      this._pH ?? (this._pH = {});
      this._pH["content-type"] = "text/html; charset=UTF-8";
      return typeof arg === "number" ? this.newResponse(html, arg, headers) : this.newResponse(html, arg);
    };
    this.redirect = (location, status = 302) => {
      this._h ?? (this._h = new Headers());
      this._h.set("Location", location);
      return this.newResponse(null, status);
    };
    this.cookie = (name, value, opt) => {
      const cookie = (0, import_cookie.serialize)(name, value, opt);
      this.header("set-cookie", cookie, { append: true });
    };
    this.notFound = () => {
      return this.notFoundHandler(this);
    };
    this.req = req;
    if (options) {
      this._exCtx = options.executionCtx;
      this.env = options.env;
      if (options.notFoundHandler) {
        this.notFoundHandler = options.notFoundHandler;
      }
    }
  }
  get event() {
    if (this._exCtx instanceof import_types.FetchEventLike) {
      return this._exCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this._exCtx) {
      return this._exCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    this._init = false;
    return this._res || (this._res = new Response("404 Not Found", { status: 404 }));
  }
  set res(_res) {
    this._init = false;
    if (this._res && _res) {
      this._res.headers.delete("content-type");
      this._res.headers.forEach((v, k) => {
        _res.headers.set(k, v);
      });
    }
    this._res = _res;
    this.finalized = true;
  }
  get var() {
    return { ...this._var };
  }
  get runtime() {
    const global = globalThis;
    if (global?.Deno !== void 0) {
      return "deno";
    }
    if (global?.Bun !== void 0) {
      return "bun";
    }
    if (typeof global?.WebSocketPair === "function") {
      return "workerd";
    }
    if (typeof global?.EdgeRuntime === "string") {
      return "edge-light";
    }
    if (global?.fastly !== void 0) {
      return "fastly";
    }
    if (global?.__lagon__ !== void 0) {
      return "lagon";
    }
    if (global?.process?.release?.name === "node") {
      return "node";
    }
    return "other";
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Context
});
