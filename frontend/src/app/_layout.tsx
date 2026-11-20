import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { ActivityIndicator, View, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { SesionProvider, useSesion } from '@/context/SesionContext';
import { store } from '@/store';
import { StoreGate } from '@/components/StoreGate';

SplashScreen.preventAutoHideAsync();

/** Stack raíz: con sesión se ve la app; sin sesión, solo Login (equivale al `if` de la API estática). */
function RootNavigator() {
  const { estaLogueado, estado } = useSesion();
  if (estado === 'cargando') return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={estaLogueado}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="crear" options={{ presentation: 'modal', headerShown: true, title: 'Crear pichanga' }} />
        <Stack.Screen name="subir-resultado" options={{ presentation: 'modal', headerShown: true, title: 'Subir resultado' }} />
        <Stack.Screen name="notificaciones" options={{ presentation: 'modal', headerShown: true, title: 'Notificaciones' }} />
        <Stack.Screen name="buscar-cancha" options={{ headerShown: true, title: 'Buscar cancha' }} />
        <Stack.Screen name="refuerzos" options={{ headerShown: true, title: 'Bolsa de refuerzos' }} />
        <Stack.Screen name="pichanga/[id]" options={{ headerShown: true, title: 'Pichanga' }} />
        <Stack.Screen name="mis-actividades" options={{ headerShown: true, title: 'Mis actividades privadas' }} />
      </Stack.Protected>
      <Stack.Protected guard={!estaLogueado}>
        <Stack.Screen name="login" />
        <Stack.Screen name="registro" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <SesionProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AnimatedSplashOverlay />
          <StoreGate><RootNavigator /></StoreGate>
        </ThemeProvider>
      </SesionProvider>
    </Provider>
  );
}
