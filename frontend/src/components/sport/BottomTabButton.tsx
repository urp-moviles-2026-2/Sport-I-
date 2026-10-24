import { Pressable, Text } from 'react-native';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import { BottomTabButtonStyles as s } from '@/theme';

export type BottomTabButtonProps = TabTriggerSlotProps & { label: string; symbol: string };

/** Botón de la barra inferior. Dentro de un `TabTrigger asChild` recibe `isFocused` y `onPress` solos. */
export function BottomTabButton({ label, symbol, isFocused = false, ...props }: BottomTabButtonProps) {
  return (
    <Pressable {...props} accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: isFocused }}
      style={({ pressed }) => [s.button, pressed && s.pressed]}>
      <Text accessible={false} style={[s.symbol, isFocused && s.symbolActive]}>{symbol}</Text>
      <Text style={[s.label, isFocused && s.labelActive]}>{label}</Text>
    </Pressable>
  );
}
