import prisma from "../../utils/prisma";

export const createTracking = (data: { userId: string; status: string; note?: string }) =>
  prisma.notification.create({ // reuse notification table as simple tracking events if desired
    data: { userId: data.userId, type: "OTHER", title: `Tracking: ${data.status}`, body: data.note || "", meta: {} }
  });

export const listTracking = (userId: string) =>
  prisma.notification.findMany({ where: { userId, type: "OTHER" }, orderBy: { createdAt: 'desc' } });
