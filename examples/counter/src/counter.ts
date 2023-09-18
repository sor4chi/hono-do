import { generateHonoObject } from "hono-do";

export const Counter = generateHonoObject("/counter", (app, state) => {
  const { storage } = state;

  app.post("/increment", async (c) => {
    const newVal = 1 + ((await storage.get<number>("value")) || 0);
    storage.put("value", newVal);
    return c.text(newVal.toString());
  });

  app.post("/decrement", async (c) => {
    const newVal = -1 + ((await storage.get<number>("value")) || 0);
    storage.put("value", newVal);
    return c.text(newVal.toString());
  });

  app.get("/", async (c) => {
    const value = (await storage.get<number>("value")) || 0;
    return c.text(value.toString());
  });
});
