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
var cache_exports = {};
__export(cache_exports, {
  cache: () => cache
});
module.exports = __toCommonJS(cache_exports);
const cache = (options) => {
  if (options.wait === void 0) {
    options.wait = false;
  }
  const addHeader = (response) => {
    if (options.cacheControl)
      response.headers.set("Cache-Control", options.cacheControl);
  };
  return async (c, next) => {
    const key = c.req.url;
    const cache2 = await caches.open(options.cacheName);
    const response = await cache2.match(key);
    if (!response) {
      await next();
      if (!c.res.ok) {
        return;
      }
      addHeader(c.res);
      const response2 = c.res.clone();
      if (options.wait) {
        await cache2.put(key, response2);
      } else {
        c.executionCtx.waitUntil(cache2.put(key, response2));
      }
    } else {
      return new Response(response.body, response);
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cache
});
