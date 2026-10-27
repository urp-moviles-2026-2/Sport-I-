# Mapa de navegación - PelotaYa

Navegación con **Expo Router** (sin mezclar con React Navigation). La estructura de `frontend/src/app/` es el mapa. La barra inferior es propia (`BottomTabBar`, con `expo-router/ui`).

```
RootStack (src/app/_layout.tsx)
├── (tabs)  Tabs → components/app-tabs.tsx
│   ├── index            ← Inicio
│   ├── retos (Stack)
│   │   ├── index        ← Lista de retos
│   │   └── [id]         ← Detalle de reto, params: { id }
│   ├── torneos (Stack)
│   │   ├── index        ← Lista de torneos
│   │   └── [id]         ← Detalle de torneo, params: { id }
│   ├── stats
│   ├── perfil
│   └── catalogo         ← oculto en la barra; se abre desde Perfil
├── crear (modal)            ← botón central "+"
├── subir-resultado (modal)
├── notificaciones (modal)   ← campana
├── buscar-cancha
├── refuerzos                ← Bolsa de Refuerzos
└── pichanga/[id]            ← params: { id }
```

| Ruta | Navigator | Se llega desde | Params | Qué muestra |
|------|-----------|----------------|--------|-------------|
| `/` (Inicio) | Tabs | Pantalla inicial | - | Llamado urgente, accesos rápidos y pichangas destacadas |
| `/retos` | Tabs > Stack | Tab Retos, Reto Relámpago, Inicio | - | Retos abiertos entre equipos |
| `/retos/[id]` | Tabs > Stack | Lista de retos | `{ id }` | Equipos, cancha, hora y estado del reto |
| `/torneos` | Tabs > Stack | Tab Torneos | - | Torneos relámpago de la zona |
| `/torneos/[id]` | Tabs > Stack | Lista de torneos, detalle de reto, otro torneo | `{ id }` | Grupos, llaves y partidos |
| `/stats` | Tabs | Tab Stats | - | Radar, Elo y goleadores |
| `/perfil` | Tabs | Tab Perfil | - | Ficha de jugador y Fair Play |
| `/catalogo` | Tabs (oculto) | Perfil | - | Catálogo de componentes (LAB-02) |
| `/crear` | RootStack (modal) | Botón "+" | - | Formulario para publicar una pichanga |
| `/subir-resultado` | RootStack (modal) | Inicio, detalle de reto y de torneo | - | Marcador y goleadores |
| `/notificaciones` | RootStack (modal) | Campana de Inicio | - | Avisos de partidos y retos |
| `/buscar-cancha` | RootStack | Inicio, detalle de pichanga | - | Canchas cercanas |
| `/refuerzos` | RootStack | Inicio, detalle de pichanga | - | Jugadores disponibles |
| `/pichanga/[id]` | RootStack | "¡Voy al toque!", Pichanga Destacada, avisos | `{ id }` | Cancha, hora, cupos y anotados |

**Criterio:** en tabs van las cinco secciones de uso diario; en stacks los flujos lista → detalle (retos y torneos); como modal lo que interrumpe y se cierra (crear, subir resultado, notificaciones); y como pantallas del stack raíz los destinos que se abren desde Inicio y no son una sección.
