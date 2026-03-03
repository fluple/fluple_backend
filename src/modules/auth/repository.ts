import prisma from "../../utils/prisma";

export const createUser = (data: {
  name?: string;
  email: string;
  password: string;
}) => prisma.user.create({ data });

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });
export const findUserById = (id: string) =>
  prisma.user.findUnique({ where: { id } });

export const saveRefreshToken = (data: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) => prisma.refreshToken.create({ data });
