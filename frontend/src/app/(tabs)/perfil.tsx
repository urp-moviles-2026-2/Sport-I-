import { useRouter } from 'expo-router';

import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';
import { useSesion } from '@/context/SesionContext';
import { useAppSelector } from '@/store/hooks';
import { selectAbiertas } from '@/store/pichangasSlice';

export default function PerfilScreen() {
  const router = useRouter();
  const { usuario, cerrarSesion } = useSesion();
  const abiertas = useAppSelector(selectAbiertas);

  return (
    <ScreenPlaceholder
      title="Perfil"
      symbol="☻"
      message={`Hola, ${usuario?.nombre ?? 'jugador'}. Hay ${abiertas} pichangas abiertas.`}
    >
      <PrimaryButton label="Ver catálogo de componentes" onPress={() => router.push('/catalogo')} />
      <PrimaryButton label="Cerrar sesión" onPress={cerrarSesion} />
    </ScreenPlaceholder>
  );
}
