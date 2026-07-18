import { Router } from "express";

import adminRoutes from "../modules/admin/admin.route.js";

const router = Router();

router.use("/admin", adminRoutes);

export default router;
