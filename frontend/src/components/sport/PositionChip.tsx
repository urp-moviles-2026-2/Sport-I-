import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { PositionChipStyles as s } from '@/theme';
export type PositionChipProps = { label: string; active?: boolean; style?: StyleProp<ViewStyle>; onPress: () => void };
export function PositionChip({ label, active = false, style, onPress }: PositionChipProps) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} onPress={onPress}
    style={({ pressed }) => [s.chip, active && s.active, style, pressed && s.pressed]}>
    <Text style={[s.label, active && s.activeLabel]}>{label}</Text>
  </Pressable>;
}
