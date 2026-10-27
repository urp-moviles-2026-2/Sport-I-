import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

/** Stack raíz: las tabs van dentro de (tabs); los modales y pantallas sueltas se abren encima. */
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="crear" options={{ presentation: 'modal', headerShown: true, title: 'Crear pichanga' }} />
        <Stack.Screen name="subir-resultado" options={{ presentation: 'modal', headerShown: true, title: 'Subir resultado' }} />
        <Stack.Screen name="notificaciones" options={{ presentation: 'modal', headerShown: true, title: 'Notificaciones' }} />
        <Stack.Screen name="buscar-cancha" options={{ headerShown: true, title: 'Buscar cancha' }} />
        <Stack.Screen name="refuerzos" options={{ headerShown: true, title: 'Bolsa de refuerzos' }} />
        <Stack.Screen name="pichanga/[id]" options={{ headerShown: true, title: 'Pichanga' }} />
      </Stack>
    </ThemeProvider>
  );
}
