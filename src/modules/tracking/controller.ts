import { Request, Response, NextFunction } from "express";
import * as service from "./service";
import { ok } from "../../utils/response";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const payload = req.body;
    const result = await service.createTracking(userId, payload);
    res.json(ok(result));
  } catch (err) { next(err); }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const items = await service.listTracking(userId);
    res.json(ok(items));
  } catch (err) { next(err); }
}
