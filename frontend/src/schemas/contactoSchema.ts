
import { z } from 'zod';

export const contactoSchema = z
  .object({
    nombre: z
      .string()
      .trim()
      .min(3, 'El nombre debe tener al menos 3 caracteres.')
      .max(80, 'El nombre no puede superar los 80 caracteres.'),

    correo: z
      .string()
      .trim()
      .email('Ingresa un correo electrónico válido.'),

    celular: z
      .string()
      .regex(/^9\d{8}$/, 'El celular debe empezar con 9 y tener 9 dígitos.'),

    tipo: z
      .union([z.enum(['consulta', 'sugerencia', 'reclamo']), z.literal('')])
      .refine((valor) => valor !== '', 'Selecciona un tipo de mensaje.'),

    calificacion: z
      .number()
      .int('La calificación debe ser un número entero.')
      .min(1, 'Selecciona una calificación de 1 a 5.')
      .max(5, 'La calificación máxima es 5.'),

    mensaje: z
      .string()
      .trim()
      .min(10, 'El mensaje debe tener al menos 10 caracteres.')
      .max(500, 'El mensaje no puede superar los 500 caracteres.'),

    aceptaTerminos: z
      .boolean()
      .refine(
        (acepta) => acepta,
        'Debes aceptar los términos para enviar el formulario.'
      ),
  })
  .superRefine((datos, ctx) => {
    if (datos.tipo === 'reclamo' && datos.mensaje.length < 20) {
      ctx.addIssue({
        code: 'custom',
        path: ['mensaje'],
        message: 'Para un reclamo, escribe al menos 20 caracteres.',
      });
    }
  });

export type ContactoFormValues = z.input<typeof contactoSchema>;
export type ContactoFormData = z.output<typeof contactoSchema>;
