import { Updater, defineState } from "../../src/helper/state";

describe("defineState", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let storage: any;

  beforeEach(() => {
    storage = {
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    };
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("set infered type correctly", async () => {
    const [get, set, del] = await defineState(storage, "key", "value");

    expectTypeOf(get).toEqualTypeOf<() => Promise<string>>();
    expectTypeOf(set).toEqualTypeOf<
      (value: string | Updater<string>) => Promise<string>
    >();
    expectTypeOf(del).toEqualTypeOf<() => Promise<void>>();
  });

  it("set complex type correctly", async () => {
    type ComplexType =
      | {
          status: "success";
          data: {
            foo: string;
            bar: number;
          };
        }
      | {
          status: "error";
          message: string;
        };

    const [get, set] = await defineState<ComplexType>(storage, "key", {
      status: "success",
      data: {
        foo: "foo",
        bar: 1,
      },
    });

    expectTypeOf(get).toEqualTypeOf<() => Promise<ComplexType>>();
    expectTypeOf(set).toEqualTypeOf<
      (value: ComplexType | Updater<ComplexType>) => Promise<ComplexType>
    >();

    await set({
      status: "error",
      message: "error",
    });
  });

  it("should work geter", async () => {
    const [get] = await defineState(storage, "key", "value");

    expect(await get()).toBe("value");
    expect(storage.get).toBeCalledWith("key");
    expect(storage.put).toBeCalledWith("key", "value");
  });

  it("should work setter (value)", async () => {
    const [_, set] = await defineState(storage, "key", "value");

    await set("new value");
    expect(storage.put).toBeCalledWith("key", "new value");
  });

  it("should work setter (updater)", async () => {
    const [_, set] = await defineState(storage, "key", "value");

    await set((prev) => `${prev} + ${prev}`);
    expect(storage.put).toBeCalledWith("key", "value + value");
  });

  it("should work deleter", async () => {
    const [_, __, del] = await defineState(storage, "key", "value");

    await del();
    expect(storage.delete).toBeCalledWith("key");
  });
});
