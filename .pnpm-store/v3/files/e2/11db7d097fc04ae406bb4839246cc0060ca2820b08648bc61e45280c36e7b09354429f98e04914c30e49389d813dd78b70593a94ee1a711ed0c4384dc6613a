"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var handler_exports = {};
__export(handler_exports, {
  handle: () => handle,
  isContentEncodingBinary: () => isContentEncodingBinary,
  isContentTypeBinary: () => isContentTypeBinary
});
module.exports = __toCommonJS(handler_exports);
var import_crypto = __toESM(require("crypto"), 1);
var import_encode = require("../../utils/encode");
globalThis.crypto ?? (globalThis.crypto = import_crypto.default);
const getRequestContext = (event) => {
  return event.requestContext;
};
const handle = (app) => {
  return async (event) => {
    const req = createRequest(event);
    const requestContext = getRequestContext(event);
    const res = await app.fetch(req, { requestContext });
    return createResult(res);
  };
};
const createResult = async (res) => {
  const contentType = res.headers.get("content-type");
  let isBase64Encoded = contentType && isContentTypeBinary(contentType) ? true : false;
  if (!isBase64Encoded) {
    const contentEncoding = res.headers.get("content-encoding");
    isBase64Encoded = isContentEncodingBinary(contentEncoding);
  }
  let body;
  if (isBase64Encoded) {
    const buffer = await res.arrayBuffer();
    body = (0, import_encode.encodeBase64)(buffer);
  } else {
    body = await res.text();
  }
  const result = {
    body,
    headers: {},
    statusCode: res.status,
    isBase64Encoded
  };
  res.headers.forEach((value, key) => {
    result.headers[key] = value;
  });
  return result;
};
const createRequest = (event) => {
  const queryString = extractQueryString(event);
  const urlPath = `https://${event.requestContext.domainName}${isProxyEvent(event) ? event.path : event.rawPath}`;
  const url = queryString ? `${urlPath}?${queryString}` : urlPath;
  const headers = new Headers();
  for (const [k, v] of Object.entries(event.headers)) {
    if (v)
      headers.set(k, v);
  }
  const method = "httpMethod" in event ? event.httpMethod : event.requestContext.http.method;
  const requestInit = {
    headers,
    method
  };
  if (event.body) {
    requestInit.body = event.isBase64Encoded ? Buffer.from(event.body, "base64") : event.body;
  }
  return new Request(url, requestInit);
};
const extractQueryString = (event) => {
  if (isProxyEvent(event)) {
    return Object.entries(event.queryStringParameters || {}).filter(([, value]) => value).map(([key, value]) => `${key}=${value}`).join("&");
  }
  return isProxyEventV2(event) ? event.rawQueryString : event.rawQueryString;
};
const isProxyEvent = (event) => {
  return Object.prototype.hasOwnProperty.call(event, "path");
};
const isProxyEventV2 = (event) => {
  return Object.prototype.hasOwnProperty.call(event, "rawPath");
};
const isContentTypeBinary = (contentType) => {
  return !/^(text\/(plain|html|css|javascript|csv).*|application\/(.*json|.*xml).*|image\/svg\+xml)$/.test(
    contentType
  );
};
const isContentEncodingBinary = (contentEncoding) => {
  if (contentEncoding === null) {
    return false;
  }
  return /^(gzip|deflate|compress|br)/.test(contentEncoding);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handle,
  isContentEncodingBinary,
  isContentTypeBinary
});
