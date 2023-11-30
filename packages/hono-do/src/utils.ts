export type MergeArray<T extends unknown[], U extends unknown[]> = [
  ...T,
  ...U,
] extends [...infer R]
  ? R
  : never;
