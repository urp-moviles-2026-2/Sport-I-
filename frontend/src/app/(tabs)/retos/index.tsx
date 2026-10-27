import { useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function RetosScreen() {
  const router = useRouter();
  return (
    <ScreenPlaceholder title="Retos" symbol="⚔" message="Retos abiertos entre equipos de la zona.">
      <PrimaryButton label="Ver reto #1" onPress={() => router.push('/retos/1')} />
      <PrimaryButton label="Publicar reto" onPress={() => router.push('/crear')} />
    </ScreenPlaceholder>
  );
}
