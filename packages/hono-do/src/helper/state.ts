export type Updater<T> = (prev: T) => T;

const isUpdater = <T>(value: T | Updater<T>): value is Updater<T> => {
  return typeof value === "function";
};

export async function defineState<T>(
  storage: DurableObjectStorage,
  key: string,
  initialValue: T,
): Promise<
  [() => Promise<T>, (value: T | Updater<T>) => Promise<T>, () => Promise<void>]
> {
  if (!(await storage.get(key))) {
    await storage.put(key, initialValue);
  }

  const get = async () => {
    return (await storage.get<T>(key)) || initialValue;
  };

  const set = async (value: T | Updater<T>) => {
    if (isUpdater(value)) {
      const newValue = value(await get());
      await storage.put(key, newValue);
      return newValue;
    }
    await storage.put(key, value);
    return value;
  };

  const del = async () => {
    await storage.delete(key);
  };

  return [get, set, del];
}
