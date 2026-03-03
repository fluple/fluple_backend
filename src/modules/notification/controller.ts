import { Request, Response, NextFunction } from "express";
import * as service from "./service";
import { ok } from "../../utils/response";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const items = await service.listNotifications(userId);
    res.json(ok(items));
  } catch (err) { next(err); }
}

export async function markRead(req: Request, res: Response, next: NextFunction) {
  try {
    const id = String(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const result = await service.markRead((req as any).user.id, id);
    res.json(ok(result));
  } catch (err) { next(err); }
} 
