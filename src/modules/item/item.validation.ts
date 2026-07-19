import { z } from "zod";

export const itemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  category: z.enum(["Reusable", "Energy", "Waste", "Water"]),

  image: z.string().url("Invalid image URL"),

  price: z.number().min(1, "Price must be greater than 0"),
});

export type ItemInput = z.infer<typeof itemSchema>;
