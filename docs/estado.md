# Mapa de estado - PelotaYa

Entidad principal: **pichanga**. Las demás (jugadores, retos, torneos) quedan como slices vacíos para la S10 y la S11.

## Clasificación

| Dato | Tipo | Dónde vive | Quién lo lee | Quién lo modifica |
|------|------|------------|--------------|-------------------|
| Texto del formulario "Crear pichanga" | Local | `useState` en `crear.tsx` | `crear.tsx` | `crear.tsx` |
| Texto del correo en Login | Local | `useState` en `login.tsx` | `login.tsx` | `login.tsx` |
| Usuario logueado | Context | `SesionContext` | Stack raíz, Perfil | Login (iniciar), Perfil (cerrar sesión) |
| Pichangas | Store | slice `pichangas` | Inicio, detalle de pichanga, Perfil (conteo) | `crear.tsx`, detalle de pichanga |

## Forma del store

```
{
  pichangas: { items: [ { id, titulo, cancha, zona, hora, cupos, precio, estado, creadoEn } ] }
}
```

`estado`: `abierta | completa | cancelada`. `creadoEn` es un string ISO (el store solo guarda datos planos).

## Acciones del slice `pichangas`

| Acción | Payload | Efecto |
|--------|---------|--------|
| `agregarPichanga` | `{ titulo, cancha, zona, hora, cupos, precio }` | Agrega al inicio; `prepare` genera `id`, `estado: abierta` y `creadoEn` |
| `cambiarEstado` | `{ id, estado }` | Cambia el estado de una pichanga |
| `eliminarPichanga` | `id` | Quita la pichanga |
| `reemplazarTodos` | `items[]` | Hidrata desde AsyncStorage |

## Selectores

`selectPichangas`, `selectPichangaPorId(id)`, `selectAbiertas` (conteo derivado).

## Persistencia

AsyncStorage, clave `pichangas/v1`. Se hidrata al arrancar y se guarda en cada cambio de `items` (`src/store/persistencia.ts`).

## Sesión

`SesionProvider` en el layout raíz, hook `useSesion()` (lanza error sin Provider). `Stack.Protected` muestra la app con sesión y `login` sin sesión. Login de prueba: cualquier correo.
