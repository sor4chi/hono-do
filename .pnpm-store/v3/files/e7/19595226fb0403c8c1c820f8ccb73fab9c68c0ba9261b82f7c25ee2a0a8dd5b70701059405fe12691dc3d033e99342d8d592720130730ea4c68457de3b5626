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
var jwt_exports = {};
__export(jwt_exports, {
  jwt: () => jwt
});
module.exports = __toCommonJS(jwt_exports);
var import_http_exception = require("../../http-exception");
var import_jwt = require("../../utils/jwt");
var import_context = require("../../context");
const jwt = (options) => {
  if (!options) {
    throw new Error('JWT auth middleware requires options for "secret');
  }
  if (!crypto.subtle || !crypto.subtle.importKey) {
    throw new Error("`crypto.subtle.importKey` is undefined. JWT auth middleware requires it.");
  }
  return async (ctx, next) => {
    const credentials = ctx.req.headers.get("Authorization");
    let token;
    if (credentials) {
      const parts = credentials.split(/\s+/);
      if (parts.length !== 2) {
        const res = new Response("Unauthorized", {
          status: 401,
          headers: {
            "WWW-Authenticate": `Bearer realm="${ctx.req.url}",error="invalid_request",error_description="invalid credentials structure"`
          }
        });
        throw new import_http_exception.HTTPException(401, { res });
      } else {
        token = parts[1];
      }
    } else if (options.cookie) {
      token = ctx.req.cookie(options.cookie);
    }
    if (!token) {
      const res = new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": `Bearer realm="${ctx.req.url}",error="invalid_request",error_description="no authorization included in request"`
        }
      });
      throw new import_http_exception.HTTPException(401, { res });
    }
    let payload;
    let msg = "";
    try {
      payload = await import_jwt.Jwt.verify(token, options.secret, options.alg);
    } catch (e) {
      msg = `${e}`;
    }
    if (!payload) {
      const res = new Response("Unauthorized", {
        status: 401,
        statusText: msg,
        headers: {
          "WWW-Authenticate": `Bearer realm="${ctx.req.url}",error="invalid_token",error_description="token verification failure"`
        }
      });
      throw new import_http_exception.HTTPException(401, { res });
    }
    ctx.set("jwtPayload", payload);
    await next();
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  jwt
});
