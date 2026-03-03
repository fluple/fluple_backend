import * as repo from "./repository";

export async function createTracking(userId: string, payload: { status: string; note?: string }) {
  return await repo.createTracking({ userId, status: payload.status, note: payload.note });
}

export async function listTracking(userId: string) {
  return await repo.listTracking(userId);
}
