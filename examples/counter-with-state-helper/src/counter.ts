import { generateHonoObject } from "hono-do";
import { defineState } from "hono-do/state";

export const Counter = generateHonoObject(
  "/counter",
  async (app, { storage }) => {
    const [getValue, setValue] = await defineState(storage, "value", 0);

    app.post("/increment", async (c) => {
      setValue((value) => value + 1);
      return c.text((await getValue()).toString());
    });

    app.post("/decrement", async (c) => {
      setValue((value) => value - 1);
      return c.text((await getValue()).toString());
    });

    app.get("/", async (c) => {
      return c.text((await getValue()).toString());
    });
  },
);
