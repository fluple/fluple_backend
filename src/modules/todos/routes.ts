import { Router } from "express";
import * as ctrl from "./controller";
import auth from "../../middlewares/auth";
import validate from "../../middlewares/validate";
import { createTodoSchema, getTodosSchema, updateTodoSchema } from "./validators";

const router = Router();

router.post("/todos", auth, validate(createTodoSchema), ctrl.create);
router.get("/todos", auth, validate(getTodosSchema), ctrl.getByDate);
router.patch("/todos/:id", auth, validate(updateTodoSchema), ctrl.update);
router.delete("/todos/:id", auth, ctrl.remove);

export default router;
