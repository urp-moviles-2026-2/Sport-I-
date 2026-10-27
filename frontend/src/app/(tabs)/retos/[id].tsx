import { Pressable, Text } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function RetoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: `Reto #${id}`,
          headerRight: () => (
            <Pressable onPress={() => console.log('compartir reto', id)} hitSlop={10}>
              <Text style={{ fontSize: 22 }}>↗</Text>
            </Pressable>
          ),
        }}
      />
      <ScreenPlaceholder title={`Reto #${id}`} symbol="⚔" message="Equipos, cancha, hora y estado del reto.">
        <PrimaryButton label="Subir resultado" onPress={() => router.push('/subir-resultado')} />
        <PrimaryButton label="Ver torneo #3" onPress={() => router.push('/torneos/3')} />
      </ScreenPlaceholder>
    </>
  );
}
