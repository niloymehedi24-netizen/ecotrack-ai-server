import type { ObjectId } from "mongodb";

export interface Item {
  _id?: ObjectId;

  title: string;

  description: string;

  category: "Reusable" | "Energy" | "Waste" | "Water";

  image: string;

  price: number;

  createdBy: string;

  createdAt: Date;

  updatedAt?: Date;
}
