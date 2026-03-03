import * as repo from "./repository";
import prisma from "../../utils/prisma";
import crypto from "crypto";

function genCode() {
  return crypto.randomBytes(4).toString("hex").toUpperCase();
}

export async function generateInvite(userId: string) {
  // create pair and assign host
  const code = genCode();
  const pair = await repo.createPair({ code, hostId: userId });
  if (!pair) throw { status: 500, message: "Failed to create pair" };
  // attach pair to host
  await repo.setUserPair(userId, pair.id);
  return { code: pair.code, pairId: pair.id };
}

export async function joinByCode(userId: string, code: string) {
  const pair = await repo.findPairByCode(code);
  if (!pair) throw { status: 404, message: "Invalid invite code" };

  // atomic check and set: ensure <=1 existing user in pair
  return await prisma.$transaction(async (tx) => {
    const count = await tx.user.count({ where: { pairId: pair.id } });
    if (count >= 2) throw { status: 400, message: "Pair already full" };
    await tx.user.update({ where: { id: userId }, data: { pairId: pair.id } });
    return { pairId: pair.id, code: pair.code };
  });
}

export async function getPairForUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId }, include: { pair: true } });
  if (!user || !user.pairId) return null;
  const partner = await repo.findPartner(user.pairId, userId);
  return { pair: user.pair ?? null, partner };
}

export async function unpair(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || !user.pairId) throw { status: 400, message: "No pair to unpair" };
  const pairId = user.pairId;
  // clear pairId for all users in pair and remove pair
  return await prisma.$transaction(async (tx) => {
    await tx.user.updateMany({ where: { pairId }, data: { pairId: null } });
    await tx.pair.delete({ where: { id: pairId } });
    return { ok: true };
  });
}
