import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { FairPlayBadgeStyles as s } from '@/theme';
export type FairPlayBadgeProps = { score: number; style?: StyleProp<ViewStyle> };
export function FairPlayBadge({ score, style }: FairPlayBadgeProps) {
  const display = Number.isFinite(score) ? String(score) : '—';
  return <View accessible accessibilityLabel={`Fair play: ${display}`} style={[s.badge, style]}>
    <Text style={s.text}>Fair play · {display}</Text>
  </View>;
}
