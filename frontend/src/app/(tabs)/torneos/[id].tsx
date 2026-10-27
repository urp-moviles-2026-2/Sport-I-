import { Pressable, Text } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function TorneoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const next = Number(id) + 1;
  return (
    <>
      <Stack.Screen
        options={{
          title: `Torneo #${id}`,
          headerRight: () => (
            <Pressable onPress={() => console.log('compartir torneo', id)} hitSlop={10}>
              <Text style={{ fontSize: 22 }}>↗</Text>
            </Pressable>
          ),
        }}
      />
      <ScreenPlaceholder title={`Torneo #${id}`} symbol="♛" message="Grupos, llaves y partidos del torneo.">
        <PrimaryButton label="Subir resultado" onPress={() => router.push('/subir-resultado')} />
        <PrimaryButton label={`Ver torneo #${next}`} onPress={() => router.push(`/torneos/${next}`)} />
      </ScreenPlaceholder>
    </>
  );
}
