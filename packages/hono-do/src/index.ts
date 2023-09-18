import { Env, Hono, Schema } from "hono";

interface HonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
> {
  app: Hono<E, S, BasePath>;
}

export function generateHonoObject<
  E extends Env = Env,
  S extends Schema = Record<string, never>,
  BasePath extends string = "/",
>(
  basePath: string,
  cb: (app: Hono<E, S, BasePath>, state: DurableObjectState) => void,
) {
  const honoObject = function (
    this: HonoObject<E, S, BasePath>,
    state: DurableObjectState,
  ) {
    const app = new Hono<E, S, BasePath>().basePath(basePath);
    this.app = app;
    cb(app, state);
  };

  honoObject.prototype.fetch = function (
    this: HonoObject<E, S, BasePath>,
    request: Request,
  ) {
    return this.app.fetch(request);
  };

  return honoObject;
}

export async function defineState<T>(
  storage: DurableObjectStorage,
  key: string,
  initialValue: T,
): Promise<[() => Promise<T>, (value: T | ((value: T) => T)) => Promise<T>]> {
  if (!(await storage.get(key))) {
    await storage.put(key, initialValue);
  }

  return [
    async () => {
      return (await storage.get<T>(key)) || initialValue;
    },
    async (value: T | ((value: T) => T)) => {
      if (typeof value === "function") {
        const newValue = (value as (value: T) => T)(
          (await storage.get<T>(key)) || initialValue,
        );
        await storage.put(key, newValue);
        return newValue;
      }
      await storage.put(key, value);
      return value;
    },
  ];
}
