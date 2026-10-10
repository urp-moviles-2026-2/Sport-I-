import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { AvailabilityToggleStyles as s } from '@/theme';

export type AvailabilityToggleProps = {
  label: string;
  value: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange: (value: boolean) => void;
};

/** Interruptor controlado: recibe `value` y avisa el nuevo valor con `onChange`. */
export function AvailabilityToggle({ label, value, disabled = false, style, onChange }: AvailabilityToggleProps) {
  return (
    <Pressable accessibilityRole="switch" accessibilityLabel={label} accessibilityState={{ checked: value, disabled }} disabled={disabled} onPress={() => onChange(!value)}
      style={({ pressed }) => [s.row, style, disabled && s.disabled, pressed && !disabled && s.pressed]}>
      <Text style={s.label}>{label}</Text>
      <View style={[s.track, value && s.trackOn]}>
        <View style={[s.thumb, value && s.thumbOn]} />
      </View>
    </Pressable>
  );
}