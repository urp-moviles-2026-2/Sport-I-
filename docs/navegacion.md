# Mapa de navegación - PelotaYa

La aplicación PelotaYa utiliza **Expo Router** para gestionar la navegación mediante rutas basadas en archivos, sin configurar manualmente navegadores de React Navigation.

La estructura de `frontend/src/app/` define las rutas disponibles. La navegación inferior utiliza un componente personalizado (`BottomTabBar`) integrado con `expo-router/ui`.

## 1. Árbol de navegación

```text
RootStack (src/app/_layout.tsx)
│
├── (tabs)                         Navegación principal
│   ├── _layout.tsx                Configuración de tabs
│   ├── index.tsx                  Inicio
│   ├── retos/                     Stack de retos
│   │   ├── _layout.tsx            Configuración del Stack
│   │   ├── index.tsx              Lista de retos
│   │   └── [id].tsx               Detalle de reto
│   ├── torneos/                   Stack de torneos
│   │   ├── _layout.tsx            Configuración del Stack
│   │   ├── index.tsx              Lista de torneos
│   │   └── [id].tsx               Detalle de torneo
│   ├── stats.tsx                  Estadísticas
│   ├── perfil.tsx                 Perfil del jugador
│   └── catalogo.tsx               Catálogo de componentes
│
├── crear.tsx                      Crear pichanga (modal)
├── subir-resultado.tsx            Subir resultado (modal)
├── notificaciones.tsx             Notificaciones (modal)
├── buscar-cancha.tsx              Buscar cancha
├── refuerzos.tsx                  Bolsa de refuerzos
├── retos.tsx                      Redirección a /(tabs)/retos
└── pichanga/
    └── [id].tsx                   Detalle de pichanga
```

Los archivos `_layout.tsx` definen la configuración de los navegadores y no representan pantallas independientes.

## 2. Tabla de rutas

| Ruta               | Navegador         | Se llega desde                        | Parámetros | Funcionalidad                                               |
| ------------------ | ----------------- | ------------------------------------- | ---------- | ----------------------------------------------------------- |
| `/`                | Tabs              | Pantalla inicial                      | —          | Accesos rápidos, pichangas destacadas y actividad principal |
| `/retos`           | Tabs > Stack      | Tab Retos, Inicio                     | —          | Lista de retos abiertos entre equipos                       |
| `/retos/[id]`      | Tabs > Stack      | Lista de retos                        | `{ id }`   | Información, equipos, cancha, horario y estado del reto     |
| `/torneos`         | Tabs > Stack      | Tab Torneos                           | —          | Lista de torneos disponibles                                |
| `/torneos/[id]`    | Tabs > Stack      | Lista de torneos, detalle de reto     | `{ id }`   | Grupos, llaves y partidos                                   |
| `/stats`           | Tabs              | Tab Estadísticas                      | —          | Radar, Elo y goleadores                                     |
| `/perfil`          | Tabs              | Tab Perfil                            | —          | Información del jugador y Fair Play                         |
| `/catalogo`        | Tabs (oculto)     | Perfil                                | —          | Catálogo de componentes del LAB-02                          |
| `/crear`           | RootStack (modal) | Botón central «+»                     | —          | Formulario para publicar una pichanga                       |
| `/subir-resultado` | RootStack (modal) | Inicio, detalle de reto y torneo      | —          | Registro de marcador y goleadores                           |
| `/notificaciones`  | RootStack (modal) | Campana de Inicio                     | —          | Avisos de partidos, retos y actividades                     |
| `/buscar-cancha`   | RootStack         | Inicio, detalle de pichanga           | —          | Búsqueda de canchas                                         |
| `/refuerzos`       | RootStack         | Inicio, detalle de pichanga           | —          | Bolsa de jugadores disponibles                              |
| `/pichanga/[id]`   | RootStack         | Inicio, pichangas destacadas y avisos | `{ id }`   | Información de cancha, hora, cupos y participantes          |

**Nota:** el proyecto también contiene `src/app/retos.tsx`. Su función específica debe distinguirse del Stack de retos ubicado en `(tabs)/retos/`, ya que ambos intervienen en la ruta pública `/retos`.

## 3. Navegación mediante el logo (LAB-03)

Se incorporó el componente reutilizable `HomeLogoButton`, ubicado en:

`frontend/src/components/sport/HomeLogoButton.tsx`

Este componente presenta el logo de PelotaYa como botón interactivo y utiliza Expo Router para regresar a la pantalla principal:

```tsx
router.navigate("/");
```

El componente se incorpora mediante la opción `headerRight` en los encabezados de las siguientes secciones:

| Sección             | Archivo de configuración             | Destino del botón |
| ------------------- | ------------------------------------ | ----------------- |
| Buscar cancha       | `src/app/_layout.tsx`                | `/`               |
| Bolsa de refuerzos  | `src/app/_layout.tsx`                | `/`               |
| Detalle de pichanga | `src/app/_layout.tsx`                | `/`               |
| Retos               | `src/app/(tabs)/retos/_layout.tsx`   | `/`               |
| Torneos             | `src/app/(tabs)/torneos/_layout.tsx` | `/`               |

La reutilización del componente evita duplicar el código del botón y mantiene un comportamiento uniforme entre las diferentes pantallas.

## 4. Criterios de navegación

- **Tabs:** agrupan las secciones principales de uso frecuente: Inicio, Retos, Torneos, Estadísticas y Perfil.
- **Stacks anidados:** organizan los flujos de lista y detalle en Retos y Torneos.
- **Modales:** se utilizan en Crear pichanga, Subir resultado y Notificaciones.
- **RootStack:** administra las pantallas adicionales que se abren desde otras secciones, como Buscar cancha, Refuerzos y Detalle de pichanga.
- **Rutas dinámicas:** los archivos `[id].tsx` permiten visualizar información específica mediante un identificador.
- **Botón de inicio:** `HomeLogoButton` proporciona un acceso directo a `/` desde las cinco secciones configuradas.

Esta estructura permite mantener una navegación organizada, reutilizable y consistente con la arquitectura basada en archivos de Expo Router.
