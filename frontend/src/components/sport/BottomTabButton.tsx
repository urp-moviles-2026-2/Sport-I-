import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, Text } from 'react-native';
import type { TabTriggerSlotProps } from 'expo-router/ui';
import { BottomTabButtonStyles as s, SportColors, SportSizes } from '@/theme';

export type BottomTabButtonProps = Omit<TabTriggerSlotProps, 'ref'> & {
  label: string;
  iconName?: ComponentProps<typeof Ionicons>['name'];
  activeIconName?: ComponentProps<typeof Ionicons>['name'];
  /** Compatibilidad con los ejemplos anteriores del catálogo. */
  symbol?: string;
};

export function BottomTabButton({ label, iconName, activeIconName, symbol, isFocused = false, ...props }: BottomTabButtonProps) {
  return (
    <Pressable {...props} accessibilityRole="tab" accessibilityLabel={label} accessibilityState={{ selected: isFocused }}
      style={({ pressed }) => [s.button, pressed && s.pressed]}>
      {iconName ? (
        <Ionicons accessible={false} name={isFocused ? activeIconName ?? iconName : iconName}
          size={SportSizes.icon} color={isFocused ? SportColors.primary : SportColors.muted} />
      ) : (
        <Text accessible={false} style={[s.symbol, isFocused && s.symbolActive]}>{symbol}</Text>
      )}
      <Text style={[s.label, isFocused && s.labelActive]}>{label}</Text>
    </Pressable>
  );
}
