import { z } from "zod";

export const formValidation = z.object({
  guests: z.string().min(1, { message: "Please select number of guests." }),
  date: z.date({ required_error: "Please select a date." }).refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    { message: "Booking date cannot be in the past." },
  ),
  time: z.string().min(1, { message: "Please select a time." }),
});

export type FormValues = z.infer<typeof formValidation>;
