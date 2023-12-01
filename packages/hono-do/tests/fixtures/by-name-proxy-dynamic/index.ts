import { Hono } from "hono";

import { generateHonoObject } from "../../../src";

const app = new Hono();

export const Room = generateHonoObject("/room/:roomId", async (app) => {
  app.get("/", (c) => c.text(c.req.param("roomId")));
});

app.use(
  "/room/*",
  Room.byName("ROOM", (c) => c.req.param("roomId")),
);

export default app;
