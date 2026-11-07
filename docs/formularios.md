# Inventario de formularios - PelotaYa

Cada fila describe un campo de un formulario de la app: la regla que lo valida, el mensaje de error que ve la
persona y a dónde van los datos. Los esquemas viven en `frontend/src/schemas/`.

## 1. Crear pichanga (`pichangaSchema`)

Pantalla: `src/app/crear.tsx` (modal). Destino: slice `pichangas` (acción `agregarPichanga`).

| Campo | Regla | Mensaje de error | Destino |
|-------|-------|------------------|---------|
| titulo | texto, 3 a 100 caracteres | "El título debe tener al menos 3 caracteres." / "El título no puede superar los 100 caracteres." | slice `pichangas` |
| cancha | texto, 3 a 100 caracteres | "El nombre de la cancha debe tener al menos 3 caracteres." | slice `pichangas` |
| zona | texto, 3 a 100 caracteres | "Ingresa una zona o distrito válido." | slice `pichangas` |
| hora | `regex` formato 24 horas `HH:MM` | "La hora debe tener formato de 24 horas, por ejemplo 20:30." | slice `pichangas` |
| cupos | entero (se transforma a `number`), de 1 a 40 | "Los cupos deben ser un número entero." / "Debe haber al menos 1 cupo." / "No puede haber más de 40 cupos." | slice `pichangas` |
| precio | decimal con hasta 2 decimales (se transforma a `number`), de 0 a 10000 | "Ingresa una cuota válida, por ejemplo 18.50." / "La cuota no puede superar S/ 10000." | slice `pichangas` |

## 2. Contacto y comentarios (`contactoSchema`)

Pantalla: `src/app/contacto.tsx`, se abre desde Perfil. Destino: `Alert` de confirmación (API en la S11).

| Campo | Regla | Mensaje de error | Destino |
|-------|-------|------------------|---------|
| nombre | texto, 3 a 80 caracteres | "El nombre debe tener al menos 3 caracteres." | `Alert` (API en S11) |
| correo | `email` | "Ingresa un correo electrónico válido." | `Alert` (API en S11) |
| celular | `regex` de 9 dígitos | "El celular debe tener exactamente 9 dígitos." | `Alert` (API en S11) |
| tipo | `enum`: consulta, sugerencia, reclamo | "Selecciona un tipo de mensaje." | `Alert` (API en S11) |
| calificacion | `number` entero de 1 a 5 | "La calificación mínima es 1." / "La calificación máxima es 5." | `Alert` (API en S11) |
| mensaje | texto, 10 a 500 caracteres; `superRefine`: si el tipo es `reclamo`, mínimo 20 | "El mensaje debe tener al menos 10 caracteres." / "Para un reclamo, escribe al menos 20 caracteres." | `Alert` (API en S11) |
| aceptaTerminos | `boolean` que debe ser `true` (`refine`) | "Debes aceptar los términos para enviar el formulario." | `Alert` (API en S11) |

## 3. Login (no migrado)

Pantalla: `src/app/login.tsx`. Destino: `SesionContext` (autenticación real en la S12).

| Campo | Regla | Mensaje de error | Destino |
|-------|-------|------------------|---------|
| correo | formato de correo (validación manual con `regex`) | "Escribe un correo válido." | `SesionContext` |

El login es una sesión de demostración y sigue con `useState` y una validación manual. No forma parte de este
laboratorio; se migra a React Hook Form + Zod cuando se conecte la autenticación real.

## Formularios de este lab

1. Crear pichanga (requisito 5)
2. Contacto y comentarios (requisito 6)
