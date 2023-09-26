// src/adapter/vercel/handler.ts
var handle = (app) => (req, requestContext) => {
  return app.fetch(
    req,
    {},
    {
      waitUntil: requestContext?.waitUntil,
      passThroughOnException: () => {
        throw new Error("`passThroughOnException` is not implemented in the Vercel");
      }
    }
  );
};
export {
  handle
};
