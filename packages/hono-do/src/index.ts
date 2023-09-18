import { Hono } from "hono";

interface HonoObject {
  app: Hono;
}

export function generateHonoObject(
  basePath: string,
  cb: (app: Hono, state: DurableObjectState) => void,
) {
  const honoObject = function (this: HonoObject, state: DurableObjectState) {
    const app = new Hono().basePath(basePath);
    this.app = app;
    cb(app, state);
  };

  honoObject.prototype.fetch = function (this: HonoObject, request: Request) {
    return this.app.fetch(request);
  };

  return honoObject;
}
