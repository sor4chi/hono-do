import { generateHonoObject } from "hono-do";

export const Counter = generateHonoObject("/counter", async (app, state) => {
  const { storage } = state;
  let value = (await storage.get<number>("value")) ?? 0;

  app.post("/increment", (c) => {
    storage.put("value", value++);
    return c.text(value.toString());
  });

  app.post("/decrement", (c) => {
    storage.put("value", value--);
    return c.text(value.toString());
  });

  app.get("/", (c) => {
    return c.text(value.toString());
  });
});
