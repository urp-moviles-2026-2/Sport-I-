import { Pressable, Text } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function PichangaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: `Pichanga #${id}`,
          headerRight: () => (
            <Pressable onPress={() => console.log('compartir pichanga', id)} hitSlop={10}>
              <Text style={{ fontSize: 22 }}>↗</Text>
            </Pressable>
          ),
        }}
      />
      <ScreenPlaceholder title={`Pichanga #${id}`} symbol="⚡" message="Cancha, hora, cupos y jugadores anotados.">
        <PrimaryButton label="Buscar cancha" onPress={() => router.push('/buscar-cancha')} />
        <PrimaryButton label="Bolsa de refuerzos" onPress={() => router.push('/refuerzos')} />
      </ScreenPlaceholder>
    </>
  );
}
