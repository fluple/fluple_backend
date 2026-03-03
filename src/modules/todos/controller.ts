import { Request, Response, NextFunction } from "express";
import * as service from "./service";
import { ok } from "../../utils/response";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const todo = await service.createTodo(userId, req.body);
    res.json(ok(todo));
  } catch (err) { next(err); }
}

export async function getByDate(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const date = req.query.date as string;
    const todos = await service.getTodosByDate(userId, date);
    res.json(ok(todos));
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const id = String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const updated = await service.updateTodo(userId, id, req.body);
    res.json(ok(updated));
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const id = String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const result = await service.deleteTodo(userId, id);
    res.json(ok(result));
  } catch (err) { next(err); }
}
