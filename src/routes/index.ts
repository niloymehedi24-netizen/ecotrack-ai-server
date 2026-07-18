import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

router.get("/health", (_, res) => {
  res.json({
    success: true,

    message: "EcoTrack AI API is healthy",
  });
});

router.use("/auth", authRoutes);

export default router;
