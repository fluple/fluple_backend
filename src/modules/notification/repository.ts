import prisma from "../../utils/prisma";

export const findNotifications = (userId: string) =>
  prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });

export const markAsRead = (id: string) => prisma.notification.update({ where: { id }, data: { read: true } });
