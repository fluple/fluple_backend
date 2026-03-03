import * as repo from "./repository";
import { startOfDay, addDays } from "date-fns";

export async function createReminder(userId: string, payload: { title: string; description?: string; remindAt: string; repeat?: string }) {
  const remindAt = new Date(payload.remindAt);
  return await repo.createReminder({ userId, title: payload.title, description: payload.description, remindAt, repeat: payload.repeat });
}

export async function getReminders(userId: string, filter?: string) {
  const today = startOfDay(new Date());
  if (!filter || filter === "today") {
    return await repo.findRemindersBetween(userId, today, addDays(today, 1));
  }
  if (filter === "tomorrow") {
    const t = addDays(today, 1);
    return await repo.findRemindersBetween(userId, t, addDays(t, 1));
  }
  if (filter === "week") {
    return await repo.findRemindersBetween(userId, today, addDays(today, 7));
  }
  return await repo.findRemindersBetween(userId, today, addDays(today, 30));
}

export async function updateReminder(userId: string, id: string, data: any) {
  const r = await repo.findReminderById(id);
  if (!r) throw { status: 404, message: "Reminder not found" };
  if (r.userId !== userId) throw { status: 403, message: "Forbidden" };
  return await repo.updateReminder(id, data);
}

export async function deleteReminder(userId: string, id: string) {
  const r = await repo.findReminderById(id);
  if (!r) throw { status: 404, message: "Reminder not found" };
  if (r.userId !== userId) throw { status: 403, message: "Forbidden" };
  return await repo.deleteReminder(id);
}
