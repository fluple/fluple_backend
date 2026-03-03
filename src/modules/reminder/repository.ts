import prisma from "../../utils/prisma";

export const createReminder = (data: { userId: string; title: string; description?: string; remindAt: Date; repeat?: string }) =>
  prisma.reminder.create({ data });

export const findRemindersBetween = (userId: string, from: Date, to: Date) =>
  prisma.reminder.findMany({ where: { userId, remindAt: { gte: from, lt: to } }, orderBy: { remindAt: 'asc' } });

export const findReminderById = (id: string) => prisma.reminder.findUnique({ where: { id } });

export const updateReminder = (id: string, data: any) => prisma.reminder.update({ where: { id }, data });

export const deleteReminder = (id: string) => prisma.reminder.delete({ where: { id } });
