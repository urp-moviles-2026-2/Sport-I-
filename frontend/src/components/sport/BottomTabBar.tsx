import { type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarStyles as s } from '@/theme';
import { FloatingActionButton } from './FloatingActionButton';

export type BottomTabBarProps = ViewProps & { children: ReactNode; splitAt?: number; createLabel: string; onCreate: () => void };

/**
 * Barra inferior con cinco tabs y acción flotante centrada, independiente de la fila.
 * Se usa como hijo de `<TabList asChild>`.
 */
export function BottomTabBar({ children, splitAt: _splitAt, createLabel, onCreate, style, ...rest }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" {...rest} style={[style, s.wrap]}>
      <View pointerEvents="box-none" style={s.inner}>
        <View accessible={false} style={s.surface} />
        <View style={[s.row, { paddingBottom: insets.bottom }]}>
          {children}
        </View>
        <View pointerEvents="box-none" style={s.fabSlot}>
          <FloatingActionButton label={createLabel} onPress={onCreate} />
        </View>
      </View>
    </View>
  );
}
