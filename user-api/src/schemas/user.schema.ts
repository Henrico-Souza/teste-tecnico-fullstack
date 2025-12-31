import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
    email: z.email("O email informado é inválido."),
    age: z.number().min(18, "A idade mínima para cadastro é 18 anos"),
});

export type User = z.infer<typeof userSchema>;