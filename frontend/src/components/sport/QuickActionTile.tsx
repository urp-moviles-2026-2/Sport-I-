import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { QuickActionTileStyles as s } from '@/theme';

export type QuickActionTileProps = { label: string; symbol: string; tone?: 'primary' | 'orange'; style?: StyleProp<ViewStyle>; onPress: () => void };

/** Atajo cuadrado con ícono y nombre (Buscar Cancha, Reto Relámpago…). */
export function QuickActionTile({ label, symbol, tone = 'primary', style, onPress }: QuickActionTileProps) {
  const orange = tone === 'orange';
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={({ pressed }) => [s.tile, style, pressed && s.pressed]}>
      <View accessible={false} style={[s.icon, orange && s.iconOrange]}>
        <Text style={[s.symbol, orange && s.symbolOrange]}>{symbol}</Text>
      </View>
      <Text style={s.label}>{label}</Text>
    </Pressable>
  );
}
