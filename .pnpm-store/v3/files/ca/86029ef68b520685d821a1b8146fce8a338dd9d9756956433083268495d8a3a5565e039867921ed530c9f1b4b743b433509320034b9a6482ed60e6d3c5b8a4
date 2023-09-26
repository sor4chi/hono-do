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
var request_exports = {};
__export(request_exports, {
  HonoRequest: () => HonoRequest
});
module.exports = __toCommonJS(request_exports);
var import_body = require("./utils/body");
var import_cookie = require("./utils/cookie");
var import_url = require("./utils/url");
class HonoRequest {
  constructor(request, path = "/", paramData) {
    this.bodyCache = {};
    this.cachedBody = (key) => {
      const { bodyCache, raw } = this;
      const cachedBody = bodyCache[key];
      if (cachedBody)
        return cachedBody;
      if (bodyCache.arrayBuffer) {
        return (async () => {
          return await new Response(bodyCache.arrayBuffer)[key]();
        })();
      }
      return bodyCache[key] = raw[key]();
    };
    this.raw = request;
    this.path = path;
    this.paramData = paramData;
    this.vData = {};
  }
  param(key) {
    if (this.paramData) {
      if (key) {
        const param = this.paramData[key];
        return param ? /\%/.test(param) ? (0, import_url.decodeURIComponent_)(param) : param : void 0;
      } else {
        const decoded = {};
        for (const [key2, value] of Object.entries(this.paramData)) {
          if (value && typeof value === "string") {
            decoded[key2] = /\%/.test(value) ? (0, import_url.decodeURIComponent_)(value) : value;
          }
        }
        return decoded;
      }
    }
    return null;
  }
  query(key) {
    return (0, import_url.getQueryParam)(this.url, key);
  }
  queries(key) {
    return (0, import_url.getQueryParams)(this.url, key);
  }
  header(name) {
    if (name)
      return this.raw.headers.get(name.toLowerCase()) ?? void 0;
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  cookie(key) {
    const cookie = this.raw.headers.get("Cookie");
    if (!cookie)
      return;
    const obj = (0, import_cookie.parse)(cookie);
    if (key) {
      const value = obj[key];
      return value;
    } else {
      return obj;
    }
  }
  async parseBody() {
    if (this.bodyCache.parsedBody)
      return this.bodyCache.parsedBody;
    const parsedBody = await (0, import_body.parseBody)(this);
    this.bodyCache.parsedBody = parsedBody;
    return parsedBody;
  }
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.vData[target] = data;
  }
  valid(target) {
    return this.vData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get headers() {
    return this.raw.headers;
  }
  get body() {
    return this.raw.body;
  }
  get bodyUsed() {
    return this.raw.bodyUsed;
  }
  get integrity() {
    return this.raw.integrity;
  }
  get keepalive() {
    return this.raw.keepalive;
  }
  get referrer() {
    return this.raw.referrer;
  }
  get signal() {
    return this.raw.signal;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HonoRequest
});
