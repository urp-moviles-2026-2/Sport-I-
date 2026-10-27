import { useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function CrearScreen() {
  const router = useRouter();
  return (
    <ScreenPlaceholder title="Crear pichanga" symbol="＋" message="Formulario para publicar una pichanga: cancha, hora y cupos.">
      <PrimaryButton label="Publicar" onPress={() => router.back()} />
    </ScreenPlaceholder>
  );
}
