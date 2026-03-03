import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    date: z.string(),
  }),
});

export const getTodosSchema = z.object({
  query: z.object({ date: z.string() }),
});

export const updateTodoSchema = z.object({
  body: z.object({ title: z.string().optional(), description: z.string().optional(), completed: z.boolean().optional() }),
});
