import { getDB } from "../../config/db.js";

export const aiConversationCollection = () => {
  const db = getDB();

  return db.collection("ai_conversations");
};
