import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { SportColors as c } from '@/constants/sport-theme';

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

const s = StyleSheet.create({
  button: { minHeight: 52, borderRadius: 999, paddingVertical: 14, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: c.primary, boxShadow: '0px 4px 22px rgba(190, 248, 41, 0.20)' },
  orange: { backgroundColor: c.orange, boxShadow: '0px 4px 22px rgba(245, 119, 0, 0.16)' },
  secondary: { backgroundColor: c.elevated },
  label: { color: c.primaryText, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  secondaryLabel: { color: c.text },
  disabled: { backgroundColor: c.disabled, boxShadow: 'none' }, disabledLabel: { color: c.muted },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});
