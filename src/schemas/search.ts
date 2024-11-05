import { z } from "zod";

export const searchSchema = z.object({
  q: z.string({ message: "Preencha o campo de busca" }).min(3, "Mínimo 3 caracteres."),
  page: z.coerce.number().min(0).optional()
})