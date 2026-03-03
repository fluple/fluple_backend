import { z } from "zod";

export const createReminderSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    remindAt: z.string(),
    repeat: z.string().optional(),
  }),
});

export const getRemindersSchema = z.object({
  query: z.object({ filter: z.string().optional() }),
});

export const updateReminderSchema = z.object({ body: z.object({ title: z.string().optional(), description: z.string().optional(), remindAt: z.string().optional() }) });
