import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { MatchCardStyles as s } from '@/theme';
import { AvatarStack } from './AvatarStack';
import { StatusBadge } from './StatusBadge';

export type MatchCardProps = {
  weekday: string;
  day: string;
  title: string;
  location: string;
  format: string;
  players: string[];
  extraPlayers?: number;
  ready: number;
  total: number;
  paid?: boolean;
  paymentNote: string;
  missing: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

/** Tarjeta de una pichanga confirmada: fecha, lugar, jugadores listos y estado del pago. */
export function MatchCard({ weekday, day, title, location, format, players, extraPlayers, ready, total, paid = false, paymentNote, missing, style, onPress }: MatchCardProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${title}, ${location}, ${ready} de ${total} listos`} onPress={onPress}
      style={({ pressed }) => [s.card, style, pressed && s.pressed]}>
      <View style={s.top}>
        <View accessible={false} style={s.date}>
          <Text style={s.day}>{weekday}</Text>
          <Text style={s.dayNumber}>{day}</Text>
        </View>
        <View style={s.info}>
          <View style={s.titleRow}>
            <Text style={s.title}>{title}</Text>
            <StatusBadge label={format} tone="primary" />
          </View>
          <Text style={s.location}>⌖ {location}</Text>
        </View>
      </View>

      <View style={s.players}>
        <AvatarStack initials={players} extra={extraPlayers} />
        <Text style={s.ready}>{ready}/{total} Listos</Text>
        {paid && <Text style={s.paid}>✓ Cancha Pagada</Text>}
      </View>

      <View style={s.footer}>
        <View style={s.payment}>
          <View accessible={false} style={s.dot} />
          <Text style={s.footerText}>{paymentNote}</Text>
        </View>
        <Text style={s.missing}>{missing}</Text>
      </View>
    </Pressable>
  );
}
