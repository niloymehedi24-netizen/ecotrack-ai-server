import { getDB } from "../../config/db.js";

import type { User } from "../../types/user.types.js";

export const usersCollection = () => {
  return getDB().collection<User>("users");
};
