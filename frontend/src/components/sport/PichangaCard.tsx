import { Pressable, Text, View } from 'react-native';
import { type Pichanga } from '@/store/pichangasSlice';
import { PichangaStyles as s } from '@/theme/pichanga-styles';
import { ScreenStyles } from '@/theme';
import { StatusBadge } from './StatusBadge';
export function PichangaCard({ pichanga: p, onPress }: { pichanga: Pichanga; onPress: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={`Ver ${p.titulo}, ${p.estado}`} onPress={onPress} style={({ pressed }) => [s.card, pressed && s.pressed]}>
    <View style={s.cardTop}><Text style={s.cardTitle}>{p.titulo}</Text><StatusBadge label={p.estado.toUpperCase()} tone={p.estado === 'abierta' ? 'primary' : p.estado === 'cancelada' ? 'orange' : 'neutral'} /></View>
    <Text style={ScreenStyles.subtitle}>{p.cancha} · {p.zona}</Text>
    <Text style={ScreenStyles.notice}>{p.hora} · S/ {p.precio.toFixed(2)} por persona</Text>
    <Text style={ScreenStyles.subtitle}>{p.estado === 'cancelada' ? 'Encuentro cancelado' : p.estado === 'completa' ? 'Sin cupos disponibles' : `${p.cupos} cupos disponibles`}</Text>
    <Text style={s.link}>Ver detalle →</Text>
  </Pressable>;
}
