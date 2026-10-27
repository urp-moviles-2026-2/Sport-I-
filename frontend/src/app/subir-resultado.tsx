import { useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function SubirResultadoScreen() {
  const router = useRouter();
  return (
    <ScreenPlaceholder title="Subir resultado" symbol="▤" message="Marcador, goleadores y confirmación del rival.">
      <PrimaryButton label="Enviar" onPress={() => router.back()} />
    </ScreenPlaceholder>
  );
}
