import { View, Text, Share, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/sport';

export default function RetoDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const compartirReto = async () => {
    try {
      await Share.share({
        message: `PelotaYa - Reto #${id}`,
      });
    } catch {
      Alert.alert('Error', 'No se pudo compartir el reto.');
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `Reto #${id}`,
          headerRight: () => (
            <Text
              onPress={compartirReto}
              accessibilityRole="button"
              style={{ fontSize: 16, color: '#2563EB', padding: 10 }}
            >
              Compartir
            </Text>
          ),
        }}
      />

      <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 115, gap: 20, backgroundColor: '#FFFFFF' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#111827' }}>
          Detalle del reto
        </Text>

        <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#2563EB' }}>
          ID recibido: {id}
        </Text>

        <Text style={{ fontSize: 16, color: '#374151' }}>
          Información del reto seleccionado en PelotaYa.
        </Text>

        <PrimaryButton
          label="Subir resultado"
          onPress={() => router.push('/subir-resultado')}
        />

        <PrimaryButton
          label="Volver a Retos"
          onPress={() => router.back()}
        />
      </View>
    </>
  );
}

