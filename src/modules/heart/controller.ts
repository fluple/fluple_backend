import { Request, Response, NextFunction } from "express";
import * as service from "./service";
import { ok } from "../../utils/response";

export async function postHeart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = (req as any).user.id;
    const { message } = req.body;
    const result = await service.sendHeart(userId, message);
    res.json(ok(result));
  } catch (err) {
    next(err);
  }
}
