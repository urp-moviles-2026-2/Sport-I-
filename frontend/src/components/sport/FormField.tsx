import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { SportColors } from '@/theme';
import { PichangaStyles as s } from '@/theme/pichanga-styles';
export function FormField({ label, ...props }: TextInputProps & { label: string }) {
  return <View style={s.field}><Text style={s.label}>{label}</Text><TextInput {...props} accessibilityLabel={label} style={s.input} placeholderTextColor={SportColors.muted} /></View>;
}
