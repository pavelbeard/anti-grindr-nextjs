import { z } from "zod";

const currentYear = new Date().getFullYear();
const minimumYear = currentYear - 100;

export const CreateProfileSchema = z.object({
  date_of_birth: z
    .date()
    .refine(
      (date) => {
        const today = new Date();
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        return date <= eighteenYearsAgo;
      },
      { message: "User must be at least 18 years old." }
    )
    .transform((date) => new Date(date).toISOString()),
});

export type CreateProfileType = z.infer<typeof CreateProfileSchema>;

const checkAge = ({
  day,
  month,
  year,
}: {
  day: number;
  month: number;
  year: number;
}) => {
  const date = new Date(year, month - 1, day);
  console.log("Date:", date.toDateString());

  const today = new Date();
  const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth() - 1,
    today.getDate()
  );
  return date <= eighteenYearsAgo;
};

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
  .refine(({ day, month, year }) => checkAge({ day, month, year }), {
    message: "You must be at least 18 years old.",
    path: ["data"],
  })
  .refine(({ year }) => year >= minimumYear, {
    message: `Year should not be earlier than ${minimumYear}`,
    path: ["year"],
  });

export type DOBType = z.infer<typeof DOBSchema>;
