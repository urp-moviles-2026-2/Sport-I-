
import { z } from 'zod';

export const loginSchema = z.object({
  correo: z
    .string()
    .trim()
    .toLowerCase()
    .email('Escribe un correo válido.'),

  clave: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres.'),
});

export type LoginFormValues = z.input<typeof loginSchema>;
export type LoginFormData = z.output<typeof loginSchema>;
