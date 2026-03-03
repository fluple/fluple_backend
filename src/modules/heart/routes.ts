import { Router } from "express";
import { postHeart } from "./controller";
import auth from "../../middlewares/auth";

const router = Router();
router.post("/heart", auth, postHeart);

export default router;
