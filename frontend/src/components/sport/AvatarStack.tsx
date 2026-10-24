import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { AvatarStackStyles as s } from '@/theme';

export type AvatarStackProps = { initials: string[]; extra?: number; style?: StyleProp<ViewStyle> };

const TONES = [undefined, 'orange', 'muted'] as const;

/** Iniciales de jugadores superpuestas; `extra` agrega el círculo "+N". */
export function AvatarStack({ initials, extra = 0, style }: AvatarStackProps) {
  return (
    <View accessible accessibilityLabel={`${initials.length + extra} jugadores`} style={[s.row, style]}>
      {initials.map((text, i) => (
        <View key={`${text}-${i}`} style={[s.avatar, i > 0 && s.overlap, TONES[i % TONES.length] && s[TONES[i % TONES.length]!]]}>
          <Text style={s.initials}>{text}</Text>
        </View>
      ))}
      {extra > 0 && (
        <View style={[s.avatar, s.overlap, s.primary]}>
          <Text style={[s.initials, s.darkInitials]}>+{extra}</Text>
        </View>
      )}
    </View>
  );
}
