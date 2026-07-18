import type { ObjectId } from "mongodb";

export type UserRole = "USER" | "ADMIN";

export interface User {
  _id?: ObjectId;

  name: string;

  email: string;

  password: string;

  role: UserRole;

  createdAt: Date;
}
