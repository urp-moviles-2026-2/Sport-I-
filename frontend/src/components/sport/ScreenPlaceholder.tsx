import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenStyles as s } from '@/theme';
import { EmptyState } from './EmptyState';

export type ScreenPlaceholderProps = { title: string; message: string; symbol?: string; actionLabel?: string; onAction?: () => void };

/** Pantalla provisional: título y un estado vacío que explica qué habrá aquí. */
export function ScreenPlaceholder({ title, message, symbol, actionLabel, onAction }: ScreenPlaceholderProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView contentContainerStyle={s.content}>
        <Text accessibilityRole="header" style={s.title}>{title}</Text>
        <EmptyState title="Próximamente" message={message} symbol={symbol} actionLabel={actionLabel} onAction={onAction} />
      </ScrollView>
    </SafeAreaView>
  );
}
