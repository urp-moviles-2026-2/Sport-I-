# Mapa de estado - PelotaYa

Entidad principal: **pichanga**. Las demás (jugadores, retos, torneos) quedan como slices vacíos para la S10 y la S11.

## Clasificación

| Dato | Tipo | Dónde vive | Quién lo lee | Quién lo modifica |
|------|------|------------|--------------|-------------------|
| Texto del formulario "Crear pichanga" | Local | `useState` en `crear.tsx` | `crear.tsx` | `crear.tsx` |
| Texto del correo en Login | Local | `useState` en `login.tsx` | `login.tsx` | `login.tsx` |
| Usuario logueado | Context | `SesionContext` | Stack raíz, Perfil | Login (iniciar), Perfil (cerrar sesión) |
| Pichangas | Store | slice `pichangas` | Inicio (FlatList y filtros), detalle, Stats y Perfil (conteo) | `crear.tsx`, detalle de pichanga |

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

## Ajustes de integración del lab-04

- El estado inicial de Redux es `items: []`: no se precargan pichangas ni rankings de ejemplo.
- Inicio y Stats usan `useAppSelector`; se eliminó `src/state/pichangas.tsx`, la implementación Context anterior que no tenía Provider.
- `home-data.ts` y el componente `MatchCard` anterior se conservan únicamente para el catálogo visual; Inicio usa `PichangaCard` con datos del slice.
- La búsqueda y el filtro de estado son estado local de Inicio. La lista usa `FlatList` con claves por id; búsqueda por título/cancha/zona sin distinguir tildes ni mayúsculas.
- `StoreGate` inicia la persistencia desde un efecto, muestra carga/error/reintento y espera la hidratación antes de montar las rutas. Las escrituras se encadenan y los fallos se muestran sin borrar el almacenamiento.
- Crear valida campos, hora HH:MM, cupos enteros de 1 a 40 y cuota no negativa. Navega al detalle del id recién generado.
- Detalle permite completar, cancelar, reabrir, compartir texto y eliminar con confirmación. Completa/cancelada no se anuncian con cupos libres.
- Stats deriva conteos del mismo slice. No representa pagos ni rendimiento deportivo inventado.
- Los datos son del dispositivo/navegador. El login sigue siendo una demostración, sin backend ni autenticación real; la sesión se pierde al recargar, las pichangas se conservan y se ven al volver a entrar.
- No se agregan rutas ni dependencias.

Prueba automática: `node tests/pichangas.cjs` desde `frontend/`.
