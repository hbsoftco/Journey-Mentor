import { describe, expect, it } from "vitest";

import { fuzzyMatch } from "~/utils/fuzzy-search";

describe("fuzzyMatch", () => {
  it("should match exact strings", () => {
    expect(fuzzyMatch("Germany", "Germany")).toBe(true);
  });

  it("should be case insensitive", () => {
    expect(fuzzyMatch("Germany", "germany")).toBe(true);
    expect(fuzzyMatch("GERMANY", "germany")).toBe(true);
  });

  it("should match partial strings", () => {
    expect(fuzzyMatch("Germany", "Ger")).toBe(true);
    expect(fuzzyMatch("Germany", "many")).toBe(true);
  });

  it("should handle empty search", () => {
    expect(fuzzyMatch("Germany", "")).toBe(true);
  });

  it("should not match different strings", () => {
    expect(fuzzyMatch("Germany", "France")).toBe(false);
  });
});
