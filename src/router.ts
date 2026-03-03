import { Router } from "express";
import authRoutes from "./modules/auth/routes";
import heartRoutes from "./modules/heart/routes";
import pairingRoutes from "./modules/pairing/routes";
import todosRoutes from "./modules/todos/routes";
import reminderRoutes from "./modules/reminder/routes";
import notificationRoutes from "./modules/notification/routes";
import trackingRoutes from "./modules/tracking/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use(heartRoutes);
router.use(pairingRoutes);
router.use(todosRoutes);
router.use(reminderRoutes);
router.use(notificationRoutes);
router.use(trackingRoutes);

export default router;
