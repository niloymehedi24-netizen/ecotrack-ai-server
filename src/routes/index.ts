import { Router } from "express";
import adminRoutes from "../modules/admin/admin.route.js";
import authRoutes from "../modules/auth/auth.routes.js";
import itemRoutes from "../modules/item/item.routes.js";
import aiRoutes from "../modules/ai/ai.route.js";

const router = Router();

// Add both groups of routes
router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);
router.use("/items", itemRoutes);
router.use("/ai", aiRoutes);

export default router;
