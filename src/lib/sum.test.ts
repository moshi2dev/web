import { describe, expect, test } from "vite-plus/test";
import { sum } from "./sum";

describe("sum", () => {
  test("returns the total of all values", () => {
    expect(sum(1, 2, 3)).toBe(6);
  });

  test("returns 0 for no values", () => {
    expect(sum()).toBe(0);
  });
});
