
import { Stack } from 'expo-router';
import HomeLogoButton from '@/components/sport/HomeLogoButton';

/**
 * Navegación de Torneos.
 * Permite regresar a Inicio desde el encabezado.
 */
export default function TorneosLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerRight: () => <HomeLogoButton />,
      }}
    >
      {/* Pantalla principal de Torneos */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Torneos',
        }}
      />

      {/* Detalle de un torneo */}
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalle del torneo',
        }}
      />
    </Stack>
  );
}
