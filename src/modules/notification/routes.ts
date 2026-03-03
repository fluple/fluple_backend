import { Router } from "express";
import * as ctrl from "./controller";
import auth from "../../middlewares/auth";

const router = Router();

router.get("/notifications", auth, ctrl.list);
router.post("/notifications/:id/read", auth, ctrl.markRead);

export default router;
