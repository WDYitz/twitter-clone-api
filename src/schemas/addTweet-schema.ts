import { z } from "zod";

export const addTweetSchema = z.object({
  body: z.string({ message: 'É necessario enviar um corpo' }),
  answer: z.string().optional()
})