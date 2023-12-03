// ref: https://developers.cloudflare.com/durable-objects/api/alarms-in-durable-objects/

import { generateHonoObject } from "hono-do";

import { Env } from ".";

const SECONDS = 1000;

declare module "hono-do" {
  interface HonoObjectVars {
    count: number;
  }
}

export const Batcher = generateHonoObject<
  Env,
  Record<string, never>,
  "/batcher"
>("/batcher", async (app, state, vars) => {
  await vars.env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS batcher (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)",
  ).run();

  const { storage } = state;
  const vals = await storage.list<string>({ reverse: true, limit: 1 });
  vars.count = vals.size === 0 ? 0 : parseInt(vals.keys().next().value);

  app.post("/", async (c) => {
    vars.count++;

    const currentAlarm = await storage.getAlarm();
    if (currentAlarm == null) {
      await storage.setAlarm(Date.now() + 10 * SECONDS);
    }

    await storage.put(vars.count.toString(), await c.req.text());
    return c.json({ queued: vars.count });
  });
}).alarm(async ({ storage }, vars) => {
  const vals = await storage.list<string>();
  let query = "INSERT INTO batcher (data) VALUES ";
  const params: string[] = [];
  for (const value of vals.values()) {
    query += "(?),";
    params.push(value);
  }
  query = query.slice(0, -1);
  await vars.env.DB.prepare(query)
    .bind(...params)
    .run();
  await storage.deleteAll();
  vars.count = 0;
});
