import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { SportColors as c } from '@/constants/sport-theme';
export type PositionChipProps = { label: string; active?: boolean; style?: StyleProp<ViewStyle>; onPress: () => void };
export function PositionChip({ label, active = false, style, onPress }: PositionChipProps) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} onPress={onPress}
    style={({ pressed }) => [s.chip, active && s.active, style, pressed && { opacity: 0.75 }]}>
    <Text style={[s.label, active && s.activeLabel]}>{label}</Text>
  </Pressable>;
}
const s = StyleSheet.create({
  chip: { minHeight: 44, borderRadius: 999, borderWidth: 1, borderColor: c.border, paddingHorizontal: 16, paddingVertical: 11, justifyContent: 'center', backgroundColor: c.elevated },
  active: { backgroundColor: c.primary, borderColor: c.primary }, label: { color: c.muted, fontWeight: '600', fontSize: 14 }, activeLabel: { color: c.primaryText },
});
