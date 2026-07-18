export type UserRole = "USER" | "ADMIN";

export interface User {
  _id?: string;

  name: string;

  email: string;

  password: string;

  role: UserRole;

  createdAt: Date;
}
