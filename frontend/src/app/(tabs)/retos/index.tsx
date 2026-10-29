import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/sport';

export default function RetosScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 24, gap: 20, backgroundColor: '#FFFFFF' }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#111827' }}>
        Retos disponibles
      </Text>

      <Text style={{ fontSize: 16, color: '#374151' }}>
        Selecciona un reto para consultar su detalle.
      </Text>

      <View style={{ padding: 20, backgroundColor: '#F3F4F6', borderRadius: 12, gap: 14 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#111827' }}>
          Reto #1
        </Text>

        <PrimaryButton
          label="Ver detalle del reto"
          onPress={() => router.push('/retos/1')}
        />
      </View>

      <PrimaryButton
        label="Publicar reto"
        onPress={() => router.push('/crear')}
      />
    </View>
  );
}
