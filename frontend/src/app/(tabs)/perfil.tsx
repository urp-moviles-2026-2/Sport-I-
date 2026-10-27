import { useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function PerfilScreen() {
  const router = useRouter();
  return (
    <ScreenPlaceholder title="Perfil" symbol="☻" message="Tu ficha de jugador, equipo y reputación Fair Play.">
      <PrimaryButton label="Ver catálogo de componentes" onPress={() => router.push('/catalogo')} />
    </ScreenPlaceholder>
  );
}
