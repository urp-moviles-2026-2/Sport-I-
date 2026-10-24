import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { IconButtonStyles as s } from '@/theme';

export type IconButtonProps = { symbol: string; label: string; size?: 'sm' | 'md'; showDot?: boolean; style?: StyleProp<ViewStyle>; onPress: () => void };

/** Botón circular con un símbolo (campana, compartir). `showDot` pinta el punto de notificación. */
export function IconButton({ symbol, label, size = 'md', showDot = false, style, onPress }: IconButtonProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}
      style={({ pressed }) => [s.button, s[size], style, pressed && s.pressed]}>
      <Text accessible={false} style={s.symbol}>{symbol}</Text>
      {showDot && <View accessible={false} style={s.dot} />}
    </Pressable>
  );
}
