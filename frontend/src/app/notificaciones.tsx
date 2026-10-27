import { useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function NotificacionesScreen() {
  const router = useRouter();
  return (
    <ScreenPlaceholder title="Notificaciones" symbol="🔔" message="Avisos de partidos, retos y refuerzos.">
      <PrimaryButton label="Ver pichanga #7" onPress={() => router.push('/pichanga/7')} />
    </ScreenPlaceholder>
  );
}
