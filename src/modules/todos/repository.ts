import prisma from "../../utils/prisma";

export const createTodo = (data: { userId: string; title: string; description?: string; date: Date }) =>
  prisma.todo.create({ data });

export const findTodosByDate = (userId: string, dateStart: Date, dateEnd: Date) =>
  prisma.todo.findMany({ where: { userId, date: { gte: dateStart, lt: dateEnd } }, orderBy: { date: 'asc' } });

export const findTodoById = (id: string) => prisma.todo.findUnique({ where: { id } });

export const updateTodo = (id: string, data: any) => prisma.todo.update({ where: { id }, data });

export const deleteTodo = (id: string) => prisma.todo.delete({ where: { id } });
