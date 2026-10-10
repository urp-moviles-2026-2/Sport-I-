import { Image, Pressable, Text, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import { PlayerCardStyles as s } from '@/theme';
import { FairPlayBadge } from './FairPlayBadge';
export type PlayerCardProps = { name: string; position: string; team: string; fairPlay: number; avatarSource?: ImageSourcePropType; style?: StyleProp<ViewStyle>; onPress: () => void };
export function PlayerCard({ name, position, team, fairPlay, avatarSource, style, onPress }: PlayerCardProps) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  return <Pressable accessibilityRole="button" accessibilityLabel={`${name}, ${position}, ${team}, fair play ${fairPlay}`} onPress={onPress}
    style={({ pressed }) => [s.card, style, pressed && s.pressed]}>
    {avatarSource ? <Image accessible={false} source={avatarSource} style={s.avatar} /> : <View accessible={false} style={s.avatar}><Text style={s.initials}>{initials || '?'}</Text></View>}
    <View style={s.info}><Text style={s.name}>{name}</Text><Text style={s.meta}>{position} · {team}</Text><FairPlayBadge score={fairPlay} /></View>
    <Text accessible={false} style={s.arrow}>›</Text>
  </Pressable>;
}
