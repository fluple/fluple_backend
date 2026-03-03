import prisma from "../../utils/prisma";

export const createPair = async (data: { code: string; hostId: string }) => {
  try {
    return await prisma.pair.create({ data });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return prisma.pair.findUnique({ where: { hostId: data.hostId } });
    }
    throw err;
  }
};

export const findPairByCode = (code: string) =>
  prisma.pair.findUnique({ where: { code } });

export const findPairById = (id: string) =>
  prisma.pair.findUnique({ where: { id } });

export const setUserPair = (userId: string, pairId: string | null) =>
  prisma.user.update({ where: { id: userId }, data: { pairId } });

export const countUsersInPair = (pairId: string) =>
  prisma.user.count({ where: { pairId } });

export const findPartner = (pairId: string, excludeUserId: string) =>
  prisma.user.findFirst({
    where: { pairId, NOT: { id: excludeUserId } },
    select: { id: true, name: true, email: true, avatarUrl: true },
  });

export const removePair = (pairId: string) =>
  prisma.pair.delete({ where: { id: pairId } });
