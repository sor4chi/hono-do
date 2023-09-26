// src/helper/adapter/index.ts
var env = (c) => {
  const global = globalThis;
  if (c.runtime === "bun" || c.runtime === "node" || c.runtime === "edge-light" || c.runtime === "lagon") {
    return global?.process?.env;
  }
  if (c.runtime === "deno") {
    return Deno.env.toObject();
  }
  if (c.runtime === "workerd") {
    return c.env;
  }
  if (c.runtime === "fastly") {
    return {};
  }
  return {};
};
var getRuntimeKey = () => {
  const global = globalThis;
  if (global?.Deno !== void 0) {
    return "deno";
  }
  if (global?.Bun !== void 0) {
    return "bun";
  }
  if (typeof global?.WebSocketPair === "function") {
    return "workerd";
  }
  if (typeof global?.EdgeRuntime === "string") {
    return "edge-light";
  }
  if (global?.fastly !== void 0) {
    return "fastly";
  }
  if (global?.__lagon__ !== void 0) {
    return "lagon";
  }
  if (global?.process?.release?.name === "node") {
    return "node";
  }
  return "other";
};
export {
  env,
  getRuntimeKey
};
