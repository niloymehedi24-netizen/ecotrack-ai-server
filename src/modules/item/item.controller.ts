import type { Request, Response } from "express";

import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} from "./item.service.js";

import { itemSchema } from "./item.validation.js";

export const createItemController = async (req: Request, res: Response) => {
  try {
    const validatedData = itemSchema.parse(req.body);

    const createdBy = req.user?.userId;

    if (!createdBy) {
      return res.status(401).json({
        success: false,

        message: "Unauthorized",
      });
    }

    const item = await createItem(validatedData, createdBy);

    return res.status(201).json({
      success: true,

      message: "Item created successfully",

      item,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,

      message: error instanceof Error ? error.message : "Failed to create item",
    });
  }
};

export const getAllItemsController = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query;

    const items = await getAllItems(
      search as string | undefined,
      category as string | undefined,
    );

    return res.json({
      success: true,

      items,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,

      message: error instanceof Error ? error.message : "Failed to fetch items",
    });
  }
};

export const getSingleItemController = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"] as string;

    if (!id) {
      return res.status(400).json({
        success: false,

        message: "Item ID is required",
      });
    }

    const item = await getItemById(id);

    if (!item) {
      return res.status(404).json({
        success: false,

        message: "Item not found",
      });
    }

    return res.json({
      success: true,

      item,
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,

      message: error instanceof Error ? error.message : "Failed to fetch item",
    });
  }
};

export const updateItemController = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"] as string;

    if (!id) {
      return res.status(400).json({
        success: false,

        message: "Item ID is required",
      });
    }

    const validatedData = itemSchema.partial().parse(req.body);

    const updatedItem = await updateItem(id, validatedData);

    return res.json({
      success: true,

      message: "Item updated successfully",

      item: updatedItem,
    });
  } catch (error: unknown) {
    return res.status(400).json({
      success: false,

      message: error instanceof Error ? error.message : "Failed to update item",
    });
  }
};

export const deleteItemController = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"] as string;

    if (!id) {
      return res.status(400).json({
        success: false,

        message: "Item ID is required",
      });
    }

    await deleteItem(id);

    return res.json({
      success: true,

      message: "Item deleted successfully",
    });
  } catch (error: unknown) {
    return res.status(500).json({
      success: false,

      message: error instanceof Error ? error.message : "Failed to delete item",
    });
  }
};
