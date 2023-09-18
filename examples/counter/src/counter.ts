import { defineState, generateHonoObject } from "hono-do";

export const Counter = generateHonoObject("/counter", async (app, state) => {
  const [getValue, setValue] = await defineState(state.storage, "value", 0);

  app.post("/increment", async (c) => {
    const newVal = 1 + (await getValue());
    setValue(newVal);
    return c.text(newVal.toString());
  });

  app.post("/decrement", async (c) => {
    const newVal = -1 + (await getValue());
    setValue(newVal);
    return c.text(newVal.toString());
  });

  app.get("/", async (c) => {
    return c.text((await getValue()).toString());
  });
});
