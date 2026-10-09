import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SportColors as c } from '@/constants/sport-theme';
import { PrimaryButton } from './PrimaryButton';
export type EmptyStateProps = { title: string; message: string; actionLabel?: string; style?: StyleProp<ViewStyle>; onAction?: () => void };
export function EmptyState({ title, message, actionLabel, style, onAction }: EmptyStateProps) {
  return <View style={[s.container, style]}>
    <Text accessible={false} style={s.symbol}>⌕</Text><Text accessibilityRole="header" style={s.title}>{title}</Text>
    <Text style={s.message}>{message}</Text>
    {!!actionLabel && !!onAction && <PrimaryButton label={actionLabel} onPress={onAction} />}
  </View>;
}
const s = StyleSheet.create({ container: { padding: 28, gap: 14, alignItems: 'center', borderRadius: 18, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }, symbol: { fontSize: 36, color: c.primary }, title: { fontSize: 18, fontWeight: '700', color: c.text, textAlign: 'center' }, message: { fontSize: 14, lineHeight: 22, color: c.muted, textAlign: 'center' } });
