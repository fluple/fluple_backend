import { Router } from "express";
import * as ctrl from "./controller";
import validate from "../../middlewares/validate";
import { registerSchema, loginSchema } from "./validators";
import auth from "../../middlewares/auth";
import * as more from "./more";

const router = Router();
router.post("/register", validate(registerSchema), ctrl.register);
router.post("/login", validate(loginSchema), ctrl.login);
router.get("/me", auth, async (req, res, next) => {
	try {
		const userId = (req as any).user.id;
		const profile = await more.getProfile(userId);
		res.json({ success: true, data: profile });
	} catch (err) { next(err); }
});

router.post("/refresh", async (req, res, next) => {
	try {
		const { refreshToken } = req.body;
		const tokens = await more.refreshTokens(refreshToken);
		res.json({ success: true, data: tokens });
	} catch (err) { next(err); }
});

export default router;
