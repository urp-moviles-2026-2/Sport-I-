import { useState } from 'react';
import { Pressable, Text, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';
import { SearchInputStyles as s, SearchInputHitSlop, SportColors as c } from '@/theme';
export type SearchInputProps = { value: string; placeholder?: string; style?: StyleProp<ViewStyle>; onChangeText: (text: string) => void; onSubmit?: () => void };
export function SearchInput({ value, placeholder = 'Buscar jugadores o equipos', style, onChangeText, onSubmit }: SearchInputProps) {
  const [focused, setFocused] = useState(false);
  return <View style={[s.container, focused && s.focused, style]}>
    <Text accessible={false} style={s.icon}>⌕</Text>
    <TextInput accessibilityLabel={placeholder} value={value} placeholder={placeholder} placeholderTextColor={c.muted}
      onChangeText={onChangeText} onSubmitEditing={() => onSubmit?.()} returnKeyType="search" autoCapitalize="none"
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} style={s.input} />
    {!!value && <Pressable accessibilityRole="button" accessibilityLabel="Limpiar búsqueda" hitSlop={SearchInputHitSlop} onPress={() => onChangeText('')} style={s.clear}>
      <Text style={s.icon}>×</Text>
    </Pressable>}
  </View>;
}
