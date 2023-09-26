// src/middleware/cache/index.ts
var cache = (options) => {
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
export {
  cache
};
