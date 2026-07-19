// import jwt from "jsonwebtoken";

// import { ENV } from "../config/env.js";

// export const createToken = (payload: { userId: string; role: string }) => {
//   return jwt.sign(
//     payload,

//     ENV.JWT_SECRET,

//     {
//       expiresIn: "7d",
//     },
//   );
// };

// export const verifyToken = (token: string) => {
//   return jwt.verify(token, ENV.JWT_SECRET);
// };

import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const createToken = (payload: { userId: string; role: string }) => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  try {
    // This will throw if the token is invalid or expired
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch (error) {
    // Return null instead of letting the library throw a hard error
    return null;
  }
};
