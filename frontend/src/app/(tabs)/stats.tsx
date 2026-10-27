import { useRouter } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { usePichangas } from '@/state/pichangas';
import { ScreenStyles as s } from '@/theme';
import { PrimaryButton } from '@/components/sport';

export default function StatsScreen() {
  const router = useRouter();
  const { matches, ready, error } = usePichangas();
  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <Text style={s.title}>Mi actividad</Text>
      <Text style={s.subtitle}>Resumen de las pichangas guardadas en este dispositivo.</Text>
      <Text style={s.heading}>{ready ? matches.length : '…'} pichangas creadas</Text>
      <Text style={s.heading}>{matches.filter(m => m.joined).length} inscripciones activas</Text>
      <Text style={s.notice}>Cuotas de tus inscripciones: S/ {matches.filter(m => m.joined).reduce((sum, m) => sum + m.price, 0).toFixed(2)}</Text>
      <Text style={s.subtitle}>El total es referencial; no registra pagos.</Text>
      {!!error && <Text style={s.notice}>{error}</Text>}
      <PrimaryButton label="Crear pichanga" onPress={() => router.push('/crear')} />
      <PrimaryButton label="Ver mis pichangas" variant="secondary" onPress={() => router.push('/')} />
      <PrimaryButton label="Ver mi perfil" onPress={() => router.push('/perfil')} />
      <PrimaryButton label="Ver torneos" variant="secondary" onPress={() => router.push('/torneos')} />
    </ScrollView>
  );
}
