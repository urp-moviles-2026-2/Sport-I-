import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { SesionProvider, useSesion } from '@/context/SesionContext';
import { store } from '@/store';
import { iniciarPersistencia } from '@/store/persistencia';

SplashScreen.preventAutoHideAsync();
iniciarPersistencia(store); // una sola vez, fuera del componente

/** Stack raíz: con sesión se ve la app; sin sesión, solo Login (equivale al `if` de la API estática). */
function RootNavigator() {
  const { estaLogueado } = useSesion();
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
      </Stack.Protected>
      <Stack.Protected guard={!estaLogueado}>
        <Stack.Screen name="login" />
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
          <RootNavigator />
        </ThemeProvider>
      </SesionProvider>
    </Provider>
  );
}
