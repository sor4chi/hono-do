// src/adapter/bun/serve-static.ts
import { existsSync } from "fs";
import { getFilePath } from "../../utils/filepath.js";
import { getMimeType } from "../../utils/mime.js";
var { file } = Bun;
var DEFAULT_DOCUMENT = "index.html";
var serveStatic = (options = { root: "" }) => {
  return async (c, next) => {
    if (c.finalized) {
      await next();
      return;
    }
    const url = new URL(c.req.url);
    const filename = options.path ?? decodeURI(url.pathname);
    let path = getFilePath({
      filename: options.rewriteRequestPath ? options.rewriteRequestPath(filename) : filename,
      root: options.root,
      defaultDocument: DEFAULT_DOCUMENT
    });
    if (!path)
      return await next();
    path = `./${path}`;
    if (existsSync(path)) {
      const content = file(path);
      if (content) {
        const mimeType = getMimeType(path);
        if (mimeType) {
          c.header("Content-Type", mimeType);
        }
        return c.body(content);
      }
    }
    console.warn(`Static file: ${path} is not found`);
    await next();
    return;
  };
};
export {
  serveStatic
};
