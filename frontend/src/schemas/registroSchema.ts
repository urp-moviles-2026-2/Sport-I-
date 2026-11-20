
import { z } from 'zod';

export const registroSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, 'Ingresa un nombre de al menos 2 caracteres.'),

  correo: z
    .string()
    .trim()
    .toLowerCase()
    .email('Escribe un correo válido.'),

  clave: z
    .string()
    .min(8, 'La contraseña debe tener mínimo 8 caracteres.'),

  confirmarClave: z.string(),
}).refine((datos) => datos.clave === datos.confirmarClave, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmarClave'],
});

export type RegistroFormValues = z.input<typeof registroSchema>;
export type RegistroFormData = z.output<typeof registroSchema>;
