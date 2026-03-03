import { Router } from "express";
import * as ctrl from "./controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post("/tracking", auth, ctrl.create);
router.get("/tracking", auth, ctrl.list);

export default router;
