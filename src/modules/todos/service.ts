import * as repo from "./repository";
import { startOfDay, addDays } from "date-fns";

export async function createTodo(userId: string, payload: { title: string; description?: string; date: string }) {
  const date = new Date(payload.date);
  const todo = await repo.createTodo({ userId, title: payload.title, description: payload.description, date });
  return todo;
}

export async function getTodosByDate(userId: string, dateStr: string) {
  const date = new Date(dateStr);
  const start = startOfDay(date);
  const end = addDays(start, 1);
  return await repo.findTodosByDate(userId, start, end);
}

export async function updateTodo(userId: string, id: string, data: any) {
  const todo = await repo.findTodoById(id);
  if (!todo) throw { status: 404, message: "Todo not found" };
  if (todo.userId !== userId) throw { status: 403, message: "Forbidden" };
  return await repo.updateTodo(id, data);
}

export async function deleteTodo(userId: string, id: string) {
  const todo = await repo.findTodoById(id);
  if (!todo) throw { status: 404, message: "Todo not found" };
  if (todo.userId !== userId) throw { status: 403, message: "Forbidden" };
  return await repo.deleteTodo(id);
}
