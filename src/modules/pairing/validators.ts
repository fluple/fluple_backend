import { z } from "zod";

export const generateSchema = z.object({});

export const joinSchema = z.object({
  body: z.object({
    code: z.string().min(4),
  }),
});

export const unpairSchema = z.object({});
