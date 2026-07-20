import { Router } from "express";
import { recommendationController } from "./recommendation.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authenticate, recommendationController);

export default router;
