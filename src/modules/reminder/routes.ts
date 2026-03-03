import { Router } from "express";
import * as ctrl from "./controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { createReminderSchema, getRemindersSchema, updateReminderSchema } from "./validators";

const router = Router();

router.post("/reminders", auth, validate(createReminderSchema), ctrl.create);
router.get("/reminders", auth, validate(getRemindersSchema), ctrl.list);
router.patch("/reminders/:id", auth, validate(updateReminderSchema), ctrl.update);
router.delete("/reminders/:id", auth, ctrl.remove);

export default router;
