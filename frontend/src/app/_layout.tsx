
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  Stack,
} from 'expo-router';

import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { PichangasProvider } from '@/state/pichangas';
import { AnimatedSplashOverlay } from '@/components/animated-icon';
import HomeLogoButton from '@/components/sport/HomeLogoButton';

// Evita ocultar automáticamente la pantalla de carga.
void SplashScreen.preventAutoHideAsync();

/**
 * Stack raíz de PelotaYa.
 *
 * - (tabs): navegación principal.
 * - crear: formulario para crear una pichanga.
 * - subir-resultado: registro de resultados.
 * - notificaciones: notificaciones del usuario.
 * - buscar-cancha: búsqueda de canchas.
 * - refuerzos: bolsa de jugadores.
 * - pichanga/[id]: detalle de una pichanga.
 *
 * El logo permite regresar a Inicio desde
 * las pantallas correspondientes.
 */
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <PichangasProvider>
        <AnimatedSplashOverlay />

        <Stack screenOptions={{ headerShown: false }}>

          {/* Navegación principal */}
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          {/* Crear pichanga */}
          <Stack.Screen
            name="crear"
            options={{
              presentation: 'modal',
              headerShown: true,
              title: 'Crear pichanga',
            }}
          />

          {/* Subir resultado */}
          <Stack.Screen
            name="subir-resultado"
            options={{
              presentation: 'modal',
              headerShown: true,
              title: 'Subir resultado',
            }}
          />

          {/* Notificaciones */}
          <Stack.Screen
            name="notificaciones"
            options={{
              presentation: 'modal',
              headerShown: true,
              title: 'Notificaciones',
            }}
          />

          {/* Buscar cancha */}
          <Stack.Screen
            name="buscar-cancha"
            options={{
              headerShown: true,
              title: 'Buscar cancha',
              headerRight: () => <HomeLogoButton />,
            }}
          />

          {/* Bolsa de refuerzos */}
          <Stack.Screen
            name="refuerzos"
            options={{
              headerShown: true,
              title: 'Bolsa de refuerzos',
              headerRight: () => <HomeLogoButton />,
            }}
          />

          {/* Detalle de pichanga */}
          <Stack.Screen
            name="pichanga/[id]"
            options={{
              headerShown: true,
              title: 'Pichanga',
              headerRight: () => <HomeLogoButton />,
            }}
          />

        </Stack>
      </PichangasProvider>
    </ThemeProvider>
  );
}
