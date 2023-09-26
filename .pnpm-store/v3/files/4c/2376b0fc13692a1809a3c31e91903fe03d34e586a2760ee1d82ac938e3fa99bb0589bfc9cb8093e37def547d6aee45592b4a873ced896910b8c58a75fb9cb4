// src/adapter/cloudflare-workers/server-static-module.ts
import manifest from "__STATIC_CONTENT_MANIFEST";
import { serveStatic } from "./serve-static.js";
var module = (options = { root: "" }) => {
  return serveStatic({
    root: options.root,
    path: options.path,
    manifest: options.manifest ? options.manifest : manifest,
    rewriteRequestPath: options.rewriteRequestPath
  });
};
export {
  module as serveStatic
};
