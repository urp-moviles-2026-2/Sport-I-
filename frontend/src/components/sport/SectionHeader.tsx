import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { SectionHeaderStyles as s } from '@/theme';
import { StatusBadge, type StatusBadgeTone } from './StatusBadge';

export type SectionHeaderProps = {
  title: string;
  badge?: string;
  badgeTone?: StatusBadgeTone;
  dot?: boolean;
  actionLabel?: string;
  style?: StyleProp<ViewStyle>;
  onAction?: () => void;
};

/** Título de sección con punto naranja, etiqueta o enlace de acción ("Ver todas ›") a la derecha. */
export function SectionHeader({ title, badge, badgeTone = 'primary', dot = false, actionLabel, style, onAction }: SectionHeaderProps) {
  return (
    <View style={[s.row, style]}>
      <View style={s.titleWrap}>
        {dot && <View accessible={false} style={s.dot} />}
        <Text accessibilityRole="header" style={s.title}>{title}</Text>
      </View>
      {!!badge && <StatusBadge label={badge} tone={badgeTone} />}
      {!!actionLabel && !!onAction && (
        <Pressable accessibilityRole="button" onPress={onAction} style={({ pressed }) => pressed && s.pressed}>
          <Text style={s.action}>{actionLabel} ›</Text>
        </Pressable>
      )}
    </View>
  );
}
