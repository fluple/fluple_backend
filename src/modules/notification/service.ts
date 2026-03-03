import * as repo from "./repository";

export async function listNotifications(userId: string) {
  return await repo.findNotifications(userId);
}

export async function markRead(userId: string, id: string) {
  // optional ownership check
  // For brevity assume repo will throw if not found
  return await repo.markAsRead(id);
}
