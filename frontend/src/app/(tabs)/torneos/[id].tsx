import { Pressable, Text, Share, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function TorneoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const next = Number(id) + 1;

  const compartirTorneo = async () => {
    try {
      await Share.share({
        message: `PelotaYa - Torneo #${id}`,
      });
    } catch {
      Alert.alert('Error', 'No se pudo compartir el torneo.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Torneo #${id}`,
          headerRight: () => (
            <Pressable onPress={compartirTorneo} hitSlop={10}>
              <Text style={{ fontSize: 16, color: '#2563EB' }}>
                Compartir
              </Text>
            </Pressable>
          ),
        }}
      />

      <ScreenPlaceholder
        title={`Torneo #${id}`}
        symbol="♛"
        message="Grupos, llaves y partidos del torneo."
      >
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#2563EB',
          marginVertical: 12,
        }}>
          ID recibido: {id}
        </Text>

        <PrimaryButton
          label="Subir resultado"
          onPress={() => router.push('/subir-resultado')}
        />

        <PrimaryButton
          label={`Ver torneo #${next}`}
          onPress={() => router.push(`/torneos/${next}`)}
        />
      </ScreenPlaceholder>
    </>
  );
}
