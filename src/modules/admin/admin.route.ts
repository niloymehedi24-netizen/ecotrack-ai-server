import { Router } from "express";
import {
  dashboardStatsController,
  usersController,
  analyticsController,
} from "./admin.controller.js";
import { verifyToken } from "../../utils/jwt.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyToken, adminOnly);

router.get("/dashboard", dashboardStatsController);
router.get("/users", usersController);
router.get("/analytics", analyticsController);

export default router;
