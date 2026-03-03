import { verifyRefreshToken, signAccessToken, signRefreshToken } from "../../utils/jwt";
import prisma from "../../utils/prisma";
import bcrypt from "bcrypt";

export async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, name: true, avatarUrl: true, pairId: true } });
  if (!user) throw { status: 404, message: "User not found" };
  return user;
}

export async function refreshTokens(refreshToken: string) {
  try {
    const payload: any = verifyRefreshToken(refreshToken);
    const userId = payload.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw { status: 401, message: "Invalid refresh token" };

    // rotate refresh token: create new refresh token and store hash
    const accessToken = signAccessToken({ userId });
    const newRefresh = signRefreshToken({ userId });
    await prisma.refreshToken.create({ data: { userId, tokenHash: await bcrypt.hash(newRefresh, 12), expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } });
    return { accessToken, refreshToken: newRefresh };
  } catch (err) {
    throw { status: 401, message: "Invalid refresh token" };
  }
}
