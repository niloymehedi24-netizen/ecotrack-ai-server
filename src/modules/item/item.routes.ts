import { Router } from "express";

import {
  createItemController,
  getAllItemsController,
  getSingleItemController,
  updateItemController,
  deleteItemController,
} from "./item.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = Router();

router.get("/", getAllItemsController);

router.get("/:id", getSingleItemController);

router.post("/", authenticate, adminOnly, createItemController);

router.patch("/:id", authenticate, adminOnly, updateItemController);

router.delete("/:id", authenticate, adminOnly, deleteItemController);

export default router;
