import checkMinimumYear, { minimumYear } from "@/lib/helpers/checkMinimumYear";
import doesHave18 from "@/lib/helpers/doesHave18";
import { z } from "zod";

// to delete
export const CreateProfileSchema = z.object({
  date_of_birth: z
    .date()
    .refine(
      (date) => {
        return doesHave18(date);
      },
      { message: "User must be at least 18 years old." }
    )
    .transform((date) => new Date(date).toISOString()),
});

export type CreateProfileType = z.infer<typeof CreateProfileSchema>;
//  ---

const isValidDate = ({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) => {
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};

export const DOBSchema = z
  .object({
    day: z.coerce
      .string()
      .regex(/^\d{1,2}$/)
      .transform(Number),
    month: z.coerce
      .string()
      .regex(/^\d{1,2}$/)
      .transform(Number),
    year: z.coerce
      .string()
      .regex(/^\d{4}$/)
      .transform(Number),
  })

  .refine(({ day, month, year }) => isValidDate({ day, month, year }), {
    message: "Date should be valid",
    path: ["data"],
  })
  .refine(
    ({ day, month, year }) => doesHave18(new Date(year, month - 1, day)),
    {
      message: "You must be at least 18 years old.",
      path: ["data"],
    }
  )
  .refine(({ year }) => checkMinimumYear(year), {
    message: `Year should not be earlier than ${minimumYear}`,
    path: ["year"],
  });

export type DOBType = z.infer<typeof DOBSchema>;

// In the future Name will be checked for prohibited words and symbols
export const UpdateNameSchema = z.object({
  name: z.string().max(25),
});

export type UpdateNameType = z.infer<typeof UpdateNameSchema>;
