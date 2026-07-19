import { getDB } from "../../config/db.js";
import type { Item } from "../../types/item.js";

export const itemsCollection = () => {
  return getDB().collection<Item>("items");
};
