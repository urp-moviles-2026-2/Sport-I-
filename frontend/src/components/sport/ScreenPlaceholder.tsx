import type { ReactNode } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenStyles as s } from '@/theme';
import { EmptyState } from './EmptyState';

export type ScreenPlaceholderProps = {
  title: string;
  message: string;
  symbol?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Botones de navegación de la maqueta (LAB-03). */
  children?: ReactNode;
};

/** Pantalla provisional: título, un estado vacío y, opcionalmente, botones para seguir el flujo. */
export function ScreenPlaceholder({ title, message, symbol, actionLabel, onAction, children }: ScreenPlaceholderProps) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView style={s.scroll} contentContainerStyle={s.content}>
        <Text accessibilityRole="header" style={s.title}>{title}</Text>
        <EmptyState title="Próximamente" message={message} symbol={symbol} actionLabel={actionLabel} onAction={onAction} />
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
