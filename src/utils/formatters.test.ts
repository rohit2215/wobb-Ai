import { describe, expect, it } from "vitest";
import { formatFollowers, formatEngagementRate } from "./formatters";

describe("formatFollowers", () => {
  it("keeps small numbers unchanged", () => {
    expect(formatFollowers(42)).toBe("42");
    expect(formatFollowers(999)).toBe("999");
  });

  it("formats thousands to K notation", () => {
    expect(formatFollowers(1500)).toBe("1.5K");
    expect(formatFollowers(120000)).toBe("120K");
  });

  it("formats millions to M notation", () => {
    expect(formatFollowers(2400000)).toBe("2.4M");
    expect(formatFollowers(10500000)).toBe("10.5M");
  });

  it("supports variable decimal precision settings", () => {
    expect(formatFollowers(2400000, 2)).toBe("2.40M");
    expect(formatFollowers(1550, 2)).toBe("1.6K"); // kPrecision adjusts internally
  });
});

describe("formatEngagementRate", () => {
  it("handles undefined rates safely", () => {
    expect(formatEngagementRate(undefined)).toBe("N/A");
  });

  it("formats fraction rates to percentages with exactly 2 decimals", () => {
    expect(formatEngagementRate(0.0456)).toBe("4.56%");
    expect(formatEngagementRate(0.123)).toBe("12.30%");
    expect(formatEngagementRate(0)).toBe("0.00%");
  });
});
