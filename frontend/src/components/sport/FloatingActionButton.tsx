import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { FloatingActionButtonStyles as s } from '@/theme';

export type FloatingActionButtonProps = { label: string; symbol?: string; style?: StyleProp<ViewStyle>; onPress: () => void };

/** Botón circular de acción principal (crear pichanga). `label` es solo para accesibilidad. */
export function FloatingActionButton({ label, symbol = '+', style, onPress }: FloatingActionButtonProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}
      style={({ pressed }) => [s.fab, style, pressed && s.pressed]}>
      <Text accessible={false} style={s.symbol}>{symbol}</Text>
    </Pressable>
  );
}
