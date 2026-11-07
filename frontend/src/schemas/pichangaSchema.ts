
import { z } from 'zod';

export const pichangaSchema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres.')
    .max(100, 'El título no puede superar los 100 caracteres.'),

  cancha: z
    .string()
    .trim()
    .min(3, 'El nombre de la cancha debe tener al menos 3 caracteres.')
    .max(100, 'El nombre de la cancha no puede superar los 100 caracteres.'),

  zona: z
    .string()
    .trim()
    .min(3, 'Ingresa una zona o distrito válido.')
    .max(100, 'La zona no puede superar los 100 caracteres.'),

  hora: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      'La hora debe tener formato de 24 horas, por ejemplo 20:30.',
    ),

  cupos: z
    .string()
    .regex(/^\d+$/, 'Los cupos deben ser un número entero.')
    .transform(Number)
    .pipe(
      z
        .number()
        .int('Los cupos deben ser un número entero.')
        .min(1, 'Debe haber al menos 1 cupo.')
        .max(40, 'No puede haber más de 40 cupos.'),
    ),

  precio: z
    .string()
    .regex(
      /^\d+([.,]\d{1,2})?$/,
      'Ingresa una cuota válida, por ejemplo 18.50.',
    )
    .transform((valor) => Number(valor.replace(',', '.')))
    .pipe(
      z
        .number()
        .min(0, 'La cuota no puede ser negativa.')
        .max(10000, 'La cuota no puede superar S/ 10000.'),
    ),
});

export type PichangaFormValues = z.input<typeof pichangaSchema>;
export type PichangaFormData = z.output<typeof pichangaSchema>;
