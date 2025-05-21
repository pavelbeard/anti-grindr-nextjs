import { describe, expect, it } from "vitest";
import * as ProfileSchemas from "./profile.schemas";

describe("Profile Schemas", () => {
  it("should validate profile creation schema", () => {
    const validData = {
      date_of_birth: new Date("2000-01-01"),
    };

    expect(() =>
      ProfileSchemas.CreateProfileSchema.parse(validData)
    ).not.toThrow();
  });

  it("should throw error for invalid date_of_birth", () => {
    const invalidData = {
      date_of_birth: new Date("2025-01-01"), // Future date
    };
    expect(() => ProfileSchemas.CreateProfileSchema.parse(invalidData)).toThrow(
      "User must be at least 18 years old."
    );
  });

  it("should throw error for missing date_of_birth", () => {
    const invalidData = {};
    expect(() => ProfileSchemas.CreateProfileSchema.parse(invalidData)).toThrow(
      "Required"
    );
  });
});

describe("DOB Schema", () => {
  it("should validate valid date", () => {
    const validData = {
      day: "01",
      month: "01",
      year: "2000",
    };

    expect(() => ProfileSchemas.DOBSchema.safeParse(validData)).not.toThrow();
  });

  it("should throw error for invalid date", () => {
    const invalidData = {
      day: "31",
      month: "02",
      year: "2000",
    };

    expect(() => ProfileSchemas.DOBSchema.parse(invalidData)).toThrow(
      "Date should be valid"
    );
  });

  it("should throw error for earliest year", () => {
    const invalidData = {
      day: "01",
      month: "01",
      year: "1920", // Assuming the current year is 2025
    };

    expect(() => ProfileSchemas.DOBSchema.parse(invalidData)).toThrow(
      "Year should not be earlier than 1925"
    );
  });

  it("should throw error for age <18", () => {
    const invalidData = {
      day: "01",
      month: "01",
      year: "2020", // Future date
    };

    expect(() => ProfileSchemas.DOBSchema.parse(invalidData)).toThrow(
      "You must be at least 18 years old."
    );
  });
});
