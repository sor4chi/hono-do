import { Hono } from "hono";

import { Counter } from "./counter";
import { Template } from "./template";

const app = new Hono();

app.use("/counter/*", Counter.byName("COUNTER", "counter"));

app.get("/", (c) => {
  return c.html(Template);
});

export default app;
export * from "./counter";
