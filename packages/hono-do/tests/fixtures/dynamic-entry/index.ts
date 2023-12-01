import { Hono } from "hono";

import { generateHonoObject } from "../../../src";

const app = new Hono<{
  Bindings: {
    ROOM: DurableObjectNamespace;
  };
}>();

app.all("/room/:roomId/*", (c) => {
  const roomId = c.req.param("roomId");
  const id = c.env.ROOM.idFromName(roomId);
  const obj = c.env.ROOM.get(id);
  return obj.fetch(c.req.raw);
});

export const Room = generateHonoObject("/room/:roomId", (app) => {
  app.get("/", (c) => c.text(c.req.param("roomId")));
});

export default app;
