import { Router } from "express";
import * as ctrl from "./controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { joinSchema } from "./validators";

const router = Router();

router.post("/pair/generate", auth, ctrl.generate);
router.post("/pair/join", auth, validate(joinSchema), ctrl.join);
router.get("/pair", auth, ctrl.getPair);
router.post("/pair/unpair", auth, ctrl.unpair);

export default router;
