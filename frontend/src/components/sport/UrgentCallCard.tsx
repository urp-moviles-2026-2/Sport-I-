import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { UrgentCallCardStyles as s } from '@/theme';
import { IconButton } from './IconButton';
import { PrimaryButton } from './PrimaryButton';
import { StatusBadge } from './StatusBadge';

export type UrgentCallCardProps = {
  eyebrow: string;
  format: string;
  title: string;
  venue: string;
  district: string;
  need: string;
  price: string;
  ctaLabel: string;
  style?: StyleProp<ViewStyle>;
  onJoin: () => void;
  onShare: () => void;
};

/** Aviso urgente: falta un jugador para una pichanga. Acciones: unirse (onJoin) y compartir (onShare). */
export function UrgentCallCard({ eyebrow, format, title, venue, district, need, price, ctaLabel, style, onJoin, onShare }: UrgentCallCardProps) {
  return (
    <View style={[s.card, style]}>
      <View style={s.top}>
        <StatusBadge label={eyebrow} tone="orange" />
        <StatusBadge label={format} tone="primary" />
      </View>
      <Text accessibilityRole="header" style={s.title}><Text style={s.bolt}>⚡ </Text>{title}</Text>
      <Text style={s.venue}>⌖ {venue} <Text style={s.district}>• {district}</Text></Text>
      <View style={s.need}>
        <Text style={s.needText}>{need}</Text>
        <Text style={s.price}>{price}</Text>
      </View>
      <View style={s.actions}>
        <PrimaryButton label={`⚡ ${ctaLabel}`} style={s.cta} onPress={onJoin} />
        <IconButton symbol="↗" label="Compartir aviso" onPress={onShare} />
      </View>
    </View>
  );
}
