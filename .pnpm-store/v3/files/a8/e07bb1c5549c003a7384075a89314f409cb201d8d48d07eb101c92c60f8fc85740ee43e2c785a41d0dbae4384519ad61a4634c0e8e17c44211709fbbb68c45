// src/middleware/etag/index.ts
import { sha1 } from "../../utils/crypto.js";
var RETAINED_304_HEADERS = [
  "cache-control",
  "content-location",
  "date",
  "etag",
  "expires",
  "vary"
];
function etagMatches(etag2, ifNoneMatch) {
  return ifNoneMatch != null && ifNoneMatch.split(/,\s*/).indexOf(etag2) > -1;
}
var etag = (options) => {
  const retainedHeaders = options?.retainedHeaders ?? RETAINED_304_HEADERS;
  const weak = options?.weak ?? false;
  return async (c, next) => {
    const ifNoneMatch = c.req.header("If-None-Match") ?? null;
    await next();
    const res = c.res;
    let etag2 = res.headers.get("ETag");
    if (!etag2) {
      const hash = await sha1(res.clone().body || "");
      etag2 = weak ? `W/"${hash}"` : `"${hash}"`;
    }
    if (etagMatches(etag2, ifNoneMatch)) {
      await c.res.blob();
      c.res = new Response(null, {
        status: 304,
        statusText: "Not Modified",
        headers: {
          ETag: etag2
        }
      });
      c.res.headers.forEach((_, key) => {
        if (retainedHeaders.indexOf(key.toLowerCase()) === -1) {
          c.res.headers.delete(key);
        }
      });
    } else {
      c.res.headers.set("ETag", etag2);
    }
  };
};
export {
  etag
};
