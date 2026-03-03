import * as repo from "./repository";
import prisma from "../../utils/prisma";

export async function sendHeart(senderId: string, message?: string) {
  const sender = await prisma.user.findUnique({ where: { id: senderId } });
  if (!sender || !sender.pairId)
    throw { status: 404, message: "No pair found" };
  const partner = await prisma.user.findFirst({
    where: { pairId: sender.pairId, NOT: { id: senderId } },
  });
  if (!partner) throw { status: 404, message: "Partner not found yet" };

  const heart = await repo.createHeart({
    senderId,
    receiverId: partner.id,
    message,
  });

  await repo.createNotification({
    userId: partner.id,
    type: "HEART",
    title: "Lagi kangen",
    body: `${sender.name ?? "Partner"} mengirim hati`,
    meta: { heartId: heart.id },
  });

  return { ok: true };
}
