import { z } from "zod";

export const recommendationValidationSchema = z.object({
  category: z.enum(["Energy", "Water", "Waste", "Reusable"]),
  budget: z.number().min(0),
  goal: z.string().min(5).max(200),
  livingType: z.enum(["Apartment", "House", "Office"]),
});
