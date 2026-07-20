import { Router } from "express";
import adminRoutes from "../modules/admin/admin.route.js";
import authRoutes from "../modules/auth/auth.routes.js";
import itemRoutes from "../modules/item/item.routes.js";
import aiRoutes from "../modules/ai/ai.route.js";
import recommendationRoutes from "../modules/recommendation/recommendation.route.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);
router.use("/items", itemRoutes);
router.use("/ai", aiRoutes);
router.use("/recommendations", recommendationRoutes);

export default router;
