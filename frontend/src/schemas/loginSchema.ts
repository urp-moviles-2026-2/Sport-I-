import { z } from 'zod';

export const loginSchema = z.object({
  correo: z
    .string()
    .trim()
    .email('Escribe un correo válido.'),
});

export type LoginFormValues = z.input<typeof loginSchema>;
export type LoginFormData = z.output<typeof loginSchema>;
