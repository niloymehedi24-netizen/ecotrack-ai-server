import { ObjectId, type Filter } from "mongodb";
import { itemsCollection } from "./item.collection.js";
import type { Item } from "../../types/item.js";
import type { ItemInput } from "./item.validation.js";

export const createItem = async (data: ItemInput, createdBy: string) => {
  const newItem: Item = {
    ...data,
    createdBy,
    createdAt: new Date(),
  };

  const result = await itemsCollection().insertOne(newItem);

  return {
    _id: result.insertedId,
    ...newItem,
  };
};

export const getAllItems = async (
  search?: string,
  category?: string,
  page: number = 1,
  limit: number = 6,
) => {
  // Properly typed MongoDB filter
  const query: Filter<Item> = {};

  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category && category !== "All") {
    query.category = category as Item["category"];
  }

  const skip = (page - 1) * limit;

  const items = await itemsCollection()
    .find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();

  const total = await itemsCollection().countDocuments(query);

  return {
    items,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getItemById = async (id: string) => {
  return itemsCollection().findOne({
    _id: new ObjectId(id),
  });
};

export const updateItem = async (id: string, data: Partial<ItemInput>) => {
  await itemsCollection().updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...data,
        updatedAt: new Date(),
      },
    },
  );

  return getItemById(id);
};

export const deleteItem = async (id: string) => {
  return itemsCollection().deleteOne({
    _id: new ObjectId(id),
  });
};
