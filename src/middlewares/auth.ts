import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import prisma from "../utils/prisma";

export default async function auth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });
    const token = header.split(" ")[1];
    const payload = verifyAccessToken(token);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    (req as any).user = {
      id: user.id,
      email: user.email,
      pairId: user.pairId,
      name: user.name,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
