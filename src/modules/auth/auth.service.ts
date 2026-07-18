import { usersCollection } from "./auth.collection.js";

import { hashPassword, comparePassword } from "../../utils/password.js";

import type { RegisterInput, LoginInput } from "./auth.validation.js";

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await usersCollection().findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await hashPassword(data.password);

  const newUser = {
    name: data.name,

    email: data.email,

    password: hashedPassword,

    role: data.role ?? "USER",

    createdAt: new Date(),
  };

  const result = await usersCollection().insertOne(newUser);

  return {
    _id: result.insertedId,

    name: newUser.name,

    email: newUser.email,

    role: newUser.role,
  };
};

export const loginUser = async (data: LoginInput) => {
  const user = await usersCollection().findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return {
    _id: user._id,

    name: user.name,

    email: user.email,

    role: user.role,
  };
};
