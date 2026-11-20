# Autenticación — Sport-I / PelotaYa (LAB-06)

## Servicio elegido
**Supabase Auth.** El backend FastAPI del proyecto sigue existiendo y no se modifica; la autenticación se delega a un proveedor especializado.
Supabase ofrece PostgreSQL y Row Level Security para los datos privados de cada jugador.
El frontend ya usa Expo Router y formularios React Hook Form/Zod, por lo que la integración conserva esas piezas.

## Flujos
| Flujo | Pantalla | Servicio | Resultado |
|---|---|---|---|
| Registro | `/registro` | `registrar` | Crea cuenta; si la confirmación está activa, solicita confirmar correo |
| Login | `/login` | `iniciarSesion` | El listener cambia la navegación protegida |
| Restaurar | Splash inicial | `escucharSesion` | `cargando` → `conSesion` o `sinSesion` |
| Logout | Perfil | `cerrarSesion` y limpieza de Redux/AsyncStorage | Vuelve a login |

## Tokens
El SDK renueva los tokens. En Android/iOS se guardan mediante `expo-secure-store` en fragmentos; en web se utiliza AsyncStorage (almacenamiento web, con menor protección). No se guardan contraseñas. Las claves `EXPO_PUBLIC_` son públicas; nunca utilizar `service_role` en el cliente.

## Recurso protegido
Tabla `actividades_privadas` en Supabase; cada fila pertenece a `user_id = auth.uid()` mediante políticas RLS. La pantalla `/mis-actividades` consulta el servidor. Ejecutar `supabase/actividades_privadas.sql` en SQL Editor.

## Configuración manual
1. Crear proyecto Supabase y habilitar Email/Password.
2. Copiar `frontend/.env.example` a `frontend/.env` y rellenar URL y clave pública.
3. Ejecutar el SQL indicado; usar dos cuentas para verificar aislamiento.
4. Instalar dependencias y ejecutar Expo. Si Confirm email está habilitado, confirmar el correo antes de entrar.
