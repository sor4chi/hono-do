export async function defineState<T>(
  storage: DurableObjectStorage,
  key: string,
  initialValue: T,
): Promise<[() => Promise<T>, (value: T | ((value: T) => T)) => Promise<T>]> {
  if (!(await storage.get(key))) {
    await storage.put(key, initialValue);
  }

  const get = async () => {
    return (await storage.get<T>(key)) || initialValue;
  };

  const set = async (value: T | ((value: T) => T)) => {
    if (typeof value === "function") {
      const newValue = (value as (value: T) => T)(await get());
      await storage.put(key, newValue);
      return newValue;
    }
    await storage.put(key, value);
    return value;
  };

  return [get, set];
}
