import { OAuth2Client } from "google-auth-library";
import { ENV } from "../../config/env.js";
import { usersCollection } from "./auth.collection.js";
import { createToken } from "../../utils/jwt.js";
import type { User } from "../../types/user.js";

const client = new OAuth2Client(ENV.GOOGLE_CLIENT_ID);

export const googleLoginService = async (credential: string) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: ENV.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload || !payload.email) {
    throw new Error("Invalid Google token");
  }

  const { email, name, picture } = payload;

  let user = await usersCollection().findOne({ email });

  if (!user) {
    const newUser: User = {
      name: name ?? "Google User",
      email,
      password: "GOOGLE_LOGIN",
      role: "USER",
      image: picture,
      createdAt: new Date(),
    };

    const result = await usersCollection().insertOne(newUser);

    user = {
      ...newUser,
      _id: result.insertedId,
    };
  }

  const token = createToken({
    userId: user._id!.toString(),
    role: user.role,
  });

  return { token, user };
};
