import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { EmptyStateStyles as s } from '@/theme';
import { PrimaryButton } from './PrimaryButton';
export type EmptyStateProps = { title: string; message: string; actionLabel?: string; style?: StyleProp<ViewStyle>; onAction?: () => void };
export function EmptyState({ title, message, actionLabel, style, onAction }: EmptyStateProps) {
  return <View style={[s.container, style]}>
    <Text accessible={false} style={s.symbol}>⌕</Text><Text accessibilityRole="header" style={s.title}>{title}</Text>
    <Text style={s.message}>{message}</Text>
    {!!actionLabel && !!onAction && <PrimaryButton label={actionLabel} onPress={onAction} />}
  </View>;
}
