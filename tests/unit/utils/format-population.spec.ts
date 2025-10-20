import { describe, expect, it } from "vitest";

import { formatPopulation } from "~/utils/format-population";

describe("formatPopulation", () => {
  it("should format small numbers correctly", () => {
    expect(formatPopulation(100)).toBe("100");
    expect(formatPopulation(999)).toBe("999");
  });

  it("should format thousands with commas", () => {
    expect(formatPopulation(1000)).toBe("1,000");
    expect(formatPopulation(50000)).toBe("50,000");
    expect(formatPopulation(999999)).toBe("999,999");
  });

  it("should format millions correctly", () => {
    expect(formatPopulation(1000000)).toBe("1,000,000");
    expect(formatPopulation(83000000)).toBe("83,000,000");
  });

  it("should handle zero", () => {
    expect(formatPopulation(0)).toBe("0");
  });

  it("should handle undefined/null gracefully", () => {
    expect(formatPopulation(undefined as any)).toBe("N/A");
    expect(formatPopulation(null as any)).toBe("N/A");
  });
});
