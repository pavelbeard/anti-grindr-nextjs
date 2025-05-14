import { describe, expect, it } from "vitest";
import * as ProfileSchemas from "./profile.schemas";

describe("Profile Schemas", () => {
  it("should validate profile creation schema", () => {
    const validData = {
      user: {
        connect: { id: "user-id" },
      },
      date_of_birth: new Date("2000-01-01"),
    };

    expect(() => ProfileSchemas.CreateProfile.parse(validData)).not.toThrow();
  });

  it("should throw error for invalid date_of_birth", () => {
    const invalidData = {
      user: {
        connect: { id: "user-id" },
      },
      date_of_birth: new Date("2025-01-01"), // Future date
    };
    expect(() => ProfileSchemas.CreateProfile.parse(invalidData)).toThrow(
      "User must be at least 18 years old."
    );
  });
});
