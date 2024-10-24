import { z } from "zod";

export const signupSchema = z.object({
  name: z.string({ message: "Nome é obrigatório" }).min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string({ message: "E-mail é obrigatório" }).email("Email inválido"),
  password: z.string({ message: "Senha é obrigatória" }).min(6, "Senha deve ter no mínimo 6 caracteres"),
});