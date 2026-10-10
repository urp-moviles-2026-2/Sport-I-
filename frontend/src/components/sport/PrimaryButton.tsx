import { Pressable, Text, type StyleProp, type ViewStyle } from 'react-native';
import { PrimaryButtonStyles as s } from '@/theme';

export type PrimaryButtonProps = {
  label: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  variant?: 'primary' | 'orange' | 'secondary';
};

export function PrimaryButton({ label, disabled = false, style, onPress, variant = 'primary' }: PrimaryButtonProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress}
      style={({ pressed }) => [s.button, s[variant], style, disabled && s.disabled, pressed && !disabled && s.pressed]}>
      <Text style={[s.label, variant === 'secondary' && s.secondaryLabel, disabled && s.disabledLabel]}>{label}</Text>
    </Pressable>
  );
}
