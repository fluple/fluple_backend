import prisma from "../../utils/prisma";

export const createHeart = (data: {
  senderId: string;
  receiverId: string;
  message?: string;
}) => prisma.heartEvent.create({ data });

export const createNotification = (data: {
  userId: string;
  type: any;
  title: string;
  body: string;
  meta?: any;
}) => prisma.notification.create({ data });
