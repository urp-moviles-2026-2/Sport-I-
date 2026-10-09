import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';
import { SportColors as c } from '@/constants/sport-theme';
import { FairPlayBadge } from './FairPlayBadge';
export type PlayerCardProps = { name: string; position: string; team: string; fairPlay: number; avatarSource?: ImageSourcePropType; style?: StyleProp<ViewStyle>; onPress: () => void };
export function PlayerCard({ name, position, team, fairPlay, avatarSource, style, onPress }: PlayerCardProps) {
  const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  return <Pressable accessibilityRole="button" accessibilityLabel={`${name}, ${position}, ${team}, fair play ${fairPlay}`} onPress={onPress}
    style={({ pressed }) => [s.card, style, pressed && { opacity: 0.8 }]}>
    {avatarSource ? <Image accessible={false} source={avatarSource} style={s.avatar} /> : <View accessible={false} style={s.avatar}><Text style={s.initials}>{initials || '?'}</Text></View>}
    <View style={s.info}><Text style={s.name}>{name}</Text><Text style={s.meta}>{position} · {team}</Text><FairPlayBadge score={fairPlay} /></View>
    <Text accessible={false} style={s.arrow}>›</Text>
  </Pressable>;
}
const s = StyleSheet.create({
  card: { backgroundColor: c.surface, borderRadius: 20, borderWidth: 1, borderColor: c.border, borderTopWidth: 3, borderTopColor: c.primary, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 52, height: 52, borderRadius: 12, backgroundColor: c.primarySoft, alignItems: 'center', justifyContent: 'center' }, initials: { color: c.primary, fontSize: 18, fontWeight: '700' },
  info: { flex: 1, gap: 7 }, name: { fontSize: 16, fontWeight: '700', color: c.text }, meta: { fontSize: 13, color: c.muted }, arrow: { color: c.muted, fontSize: 28 },
});
