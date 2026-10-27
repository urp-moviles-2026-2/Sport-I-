import { useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function BuscarCanchaScreen() {
  const router = useRouter();
  return (
    <ScreenPlaceholder title="Buscar cancha" symbol="⌕" message="Canchas cercanas con horarios y precio.">
      <PrimaryButton label="Ver pichanga #7" onPress={() => router.push('/pichanga/7')} />
    </ScreenPlaceholder>
  );
}
