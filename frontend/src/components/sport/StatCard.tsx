import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { StatCardStyles as s } from '@/theme';

export type StatCardProps = {
  eyebrow: string;
  icon: string;
  avatar: string;
  name: string;
  nickname?: string;
  subtitle?: string;
  statLabel: string;
  statValue: string;
  highlight?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

/** Tarjeta de ranking: destacado (jugador o equipo) con una estadística grande. */
export function StatCard({ eyebrow, icon, avatar, name, nickname, subtitle, statLabel, statValue, highlight = false, style, onPress }: StatCardProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${eyebrow}: ${name}, ${statLabel} ${statValue}`} onPress={onPress}
      style={({ pressed }) => [s.card, style, pressed && s.pressed]}>
      <View style={s.top}>
        <Text style={s.eyebrow}>{eyebrow}</Text>
        <Text accessible={false} style={s.icon}>{icon}</Text>
      </View>
      <View style={s.body}>
        <View accessible={false} style={s.avatar}><Text style={s.avatarText}>{avatar}</Text></View>
        <View style={s.names}>
          <Text numberOfLines={2} style={s.name}>{name}</Text>
          {!!nickname && <Text style={s.nickname}>{`"${nickname}"`}</Text>}
          {!!subtitle && <Text style={s.subtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={s.stat}>
        <Text style={s.statLabel}>{statLabel}</Text>
        <Text style={[s.statValue, highlight && s.statHighlight]}>{statValue}</Text>
      </View>
    </Pressable>
  );
}
