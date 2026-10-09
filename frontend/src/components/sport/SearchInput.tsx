import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { SportColors as c } from '@/constants/sport-theme';
export type SearchInputProps = { value: string; placeholder?: string; style?: StyleProp<ViewStyle>; onChangeText: (text: string) => void; onSubmit?: () => void };
export function SearchInput({ value, placeholder = 'Buscar jugadores o equipos', style, onChangeText, onSubmit }: SearchInputProps) {
  const [focused, setFocused] = useState(false);
  return <View style={[s.container, focused && { borderColor: c.primary }, style]}>
    <Text accessible={false} style={s.icon}>⌕</Text>
    <TextInput accessibilityLabel={placeholder} value={value} placeholder={placeholder} placeholderTextColor={c.muted}
      onChangeText={onChangeText} onSubmitEditing={() => onSubmit?.()} returnKeyType="search" autoCapitalize="none"
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={s.input} />
    {!!value && <Pressable accessibilityRole="button" accessibilityLabel="Limpiar búsqueda" hitSlop={4} onPress={() => onChangeText('')} style={s.clear}>
      <Text style={s.icon}>×</Text>
    </Pressable>}
  </View>;
}
const s = StyleSheet.create({
  container: { minHeight: 52, borderRadius: 14, borderWidth: 1, borderColor: c.border, backgroundColor: c.elevated, flexDirection: 'row', alignItems: 'center', paddingLeft: 16 },
  input: { flex: 1, minWidth: 0, paddingVertical: 14, paddingHorizontal: 10, fontSize: 15, color: c.text }, icon: { color: c.muted, fontSize: 24 }, clear: { minWidth: 44, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
});
