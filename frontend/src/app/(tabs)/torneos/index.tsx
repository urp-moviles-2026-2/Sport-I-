import { useRouter } from 'expo-router';
import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';

export default function TorneosScreen() {
  const router = useRouter();
  return (
    <ScreenPlaceholder title="Torneos" symbol="♛" message="Torneos relámpago de Pachacámac.">
      <PrimaryButton label="Ver torneo #3" onPress={() => router.push('/torneos/3')} />
    </ScreenPlaceholder>
  );
}
