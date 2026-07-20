import { Router } from "express";
import {
  dashboardStatsController,
  usersController,
  analyticsController,
} from "./admin.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { adminOnly } from "../../middlewares/admin.middleware.js";

const router = Router();

router.use(authenticate, adminOnly);

router.get("/dashboard", dashboardStatsController);
router.get("/users", usersController);
router.get("/analytics", analyticsController);

export default router;
