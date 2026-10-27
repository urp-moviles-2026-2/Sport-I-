
import { Stack } from 'expo-router';
import HomeLogoButton from '@/components/sport/HomeLogoButton';

/**
 * Navegación de Retos.
 * Incluye el logo de PelotaYa para regresar a Inicio.
 */
export default function RetosLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerRight: () => <HomeLogoButton />,
      }}
    >
      {/* Pantalla principal de Retos */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Retos',
        }}
      />

      {/* Detalle de un reto */}
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalle del reto',
        }}
      />
    </Stack>
  );
}
