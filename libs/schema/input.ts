import z from "zod";

export const InputSchema = z.object({
    title: z
        .string()
        .min(1, "Título é obrigatório")
        .max(20, "Título deve ter no máximo 20 caracteres"),

    description: z
        .string()
        .min(1, "Descrição é obrigatória")
        .max(100, "Descrição deve ter no máximo 100 caracteres"),

    priority: z.enum(["HIGH", "MEDIUM", "LOW"])
});