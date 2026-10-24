import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { StatusBadgeStyles as s } from '@/theme';

export type StatusBadgeTone = 'primary' | 'orange' | 'neutral' | 'solid';
export type StatusBadgeProps = { label: string; tone?: StatusBadgeTone; style?: StyleProp<ViewStyle> };

/** Etiqueta pequeña de estado ("1 PRÓXIMA", "F6 AMIGO", "2 CUPOS LIBRES"). `solid` = fondo lima lleno. */
export function StatusBadge({ label, tone = 'primary', style }: StatusBadgeProps) {
  return (
    <View style={[s.badge, s[tone], style]}>
      <Text style={[s.text, s[`${tone}Text`]]}>{label}</Text>
    </View>
  );
}
