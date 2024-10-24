import { z } from "zod";

export const signinSchema = z.object({
  email: z.string({ message: "E-mail é obrigatório" }).email("Email inválido"),
  password: z.string({ message: "Senha é obrigatória" }).min(6, "Senha deve ter no mínimo 6 caracteres"),
});