import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { LocationPillStyles as s } from '@/theme';

export type LocationPillProps = { label: string; style?: StyleProp<ViewStyle>; onPress: () => void };

/** Zona actual del usuario; al tocarla se podrá cambiar de zona. */
export function LocationPill({ label, style, onPress }: LocationPillProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`Zona: ${label}. Cambiar`} onPress={onPress}
      style={({ pressed }) => [s.pill, style, pressed && s.pressed]}>
      <Text accessible={false} style={s.pin}>⌖</Text>
      <Text style={s.label}>{label}</Text>
      <Text accessible={false} style={s.chevron}>⌄</Text>
    </Pressable>
  );
}
