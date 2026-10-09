import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SportColors as c } from '@/constants/sport-theme';
export type FairPlayBadgeProps = { score: number; style?: StyleProp<ViewStyle> };
export function FairPlayBadge({ score, style }: FairPlayBadgeProps) {
  const display = Number.isFinite(score) ? String(score) : '—';
  return <View accessible accessibilityLabel={`Fair play: ${display}`} style={[s.badge, style]}>
    <Text style={s.text}>Fair play · {display}</Text>
  </View>;
}
const s = StyleSheet.create({ badge: { alignSelf: 'flex-start', backgroundColor: c.primarySoft, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 }, text: { color: c.primary, fontSize: 12, fontWeight: '700' } });
