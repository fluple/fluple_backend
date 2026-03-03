import { Request, Response, NextFunction } from "express";
import * as service from "./service";
import { ok } from "../../utils/response";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const result = await service.createReminder(userId, req.body);
    res.json(ok(result));
  } catch (err) { next(err); }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const filter = req.query.filter as string | undefined;
    const items = await service.getReminders(userId, filter);
    res.json(ok(items));
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const id = String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const result = await service.updateReminder(userId, id, req.body);
    res.json(ok(result));
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const id = String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const result = await service.deleteReminder(userId, id);
    res.json(ok(result));
  } catch (err) { next(err); }
}
