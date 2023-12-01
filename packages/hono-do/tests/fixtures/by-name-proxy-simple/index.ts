import { Hono } from "hono";

import { generateHonoObject } from "../../../src";

const app = new Hono();

export const Simple = generateHonoObject("/simple", async (app) => {
  app.get("/", (c) => c.text("Hello, Hono DO!"));
});

app.use("*", Simple.byName("SIMPLE", "simple"));

export default app;
