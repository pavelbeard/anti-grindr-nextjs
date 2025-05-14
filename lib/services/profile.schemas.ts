import { z } from "zod";

export const CreateProfile = z.object({
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
  user: z.object({
    connect: z.object({
      id: z.string(),
    }),
  }),
});

export type CreateProfileType = z.infer<typeof CreateProfile>;
