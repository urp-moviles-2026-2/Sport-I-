import { useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function RefuerzosScreen() {
  const router = useRouter();
  return (
    <ScreenPlaceholder title="Bolsa de refuerzos" symbol="☺" message="Jugadores disponibles para completar tu equipo.">
      <PrimaryButton label="Crear pichanga" onPress={() => router.push('/crear')} />
    </ScreenPlaceholder>
  );
}
