export interface RecommendationInput {
  category: "Energy" | "Water" | "Waste" | "Reusable";
  budget: number;
  goal: string;
  livingType: "Apartment" | "House" | "Office";
}
