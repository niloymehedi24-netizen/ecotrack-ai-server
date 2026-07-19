import { Router } from "express";

import { chatController, historyController } from "./ai.controller.js";

import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/chat", authenticate, chatController);

router.get("/history", authenticate, historyController);

export default router;
