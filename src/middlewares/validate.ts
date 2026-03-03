import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { fail } from "../utils/response";

export default (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!parsed.success)
      return res
        .status(400)
        .json(
          fail({
            message: "Validation error",
            details: parsed.error.flatten(),
          }),
        );
    // optionally attach validated data
    (req as any).validated = parsed.data;
    next();
  };
