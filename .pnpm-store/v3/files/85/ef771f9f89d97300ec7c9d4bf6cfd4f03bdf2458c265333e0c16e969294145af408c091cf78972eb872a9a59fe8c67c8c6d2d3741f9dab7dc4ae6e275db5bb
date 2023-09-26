// src/middleware/powered-by/index.ts
var poweredBy = () => {
  return async (c, next) => {
    await next();
    c.res.headers.set("X-Powered-By", "Hono");
  };
};
export {
  poweredBy
};
