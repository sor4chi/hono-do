// src/middleware/jwt/index.ts
import { HTTPException } from "../../http-exception.js";
import { Jwt } from "../../utils/jwt/index.js";
import "../../context.js";
var jwt = (options) => {
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
        throw new HTTPException(401, { res });
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
      throw new HTTPException(401, { res });
    }
    let payload;
    let msg = "";
    try {
      payload = await Jwt.verify(token, options.secret, options.alg);
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
      throw new HTTPException(401, { res });
    }
    ctx.set("jwtPayload", payload);
    await next();
  };
};
export {
  jwt
};
