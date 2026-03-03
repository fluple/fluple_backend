import { Request, Response, NextFunction } from "express";
import * as service from "./service";
import { ok } from "../../utils/response";

export async function generate(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const result = await service.generateInvite(userId);
    res.json(ok(result));
  } catch (err) {
    next(err);
  }
}

export async function join(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const { code } = req.body;
    const result = await service.joinByCode(userId, code);
    res.json(ok(result));
  } catch (err) {
    next(err);
  }
}

export async function getPair(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const result = await service.getPairForUser(userId);
    res.json(ok(result));
  } catch (err) {
    next(err);
  }
}

export async function unpair(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req as any).user.id;
    const result = await service.unpair(userId);
    res.json(ok(result));
  } catch (err) {
    next(err);
  }
}
