import { MergeArray } from "../src/utils";

describe("MergeArray", () => {
  it("should work", () => {
    expectTypeOf<MergeArray<[1, 2], [3, 4]>>().toEqualTypeOf<[1, 2, 3, 4]>();
  });

  it("should work with empty array", () => {
    expectTypeOf<MergeArray<[], [3, 4]>>().toEqualTypeOf<[3, 4]>();
    expectTypeOf<MergeArray<[1, 2], []>>().toEqualTypeOf<[1, 2]>();
  });

  it("should work with tuple", () => {
    expectTypeOf<MergeArray<[a: 1, b: 2], [c: 3, d: 4]>>().toEqualTypeOf<
      [a: 1, b: 2, c: 3, d: 4]
    >();
  });
});
