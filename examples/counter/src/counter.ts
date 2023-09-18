import { defineState, generateHonoObject } from "hono-do";

export const Counter = generateHonoObject("/counter", async (app, state) => {
  const [getValue, setValue] = await defineState(state.storage, "value", 0);

  app.post("/increment", async (c) => {
    const newValue = await setValue((value) => value + 1);
    return c.text(newValue.toString());
  });

  app.post("/decrement", async (c) => {
    const newValue = await setValue((value) => value - 1);
    return c.text(newValue.toString());
  });

  app.get("/", async (c) => {
    const currentValue = await getValue();
    return c.text(currentValue.toString());
  });
});
