import { Request, Response, NextFunction } from "express";
import * as service from "./service";
import { ok } from "../../utils/response";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await service.register(req.body);
    res.json(ok(result));
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await service.login(req.body);
    res.json(ok(result));
  } catch (err) {
    next(err);
  }
}
