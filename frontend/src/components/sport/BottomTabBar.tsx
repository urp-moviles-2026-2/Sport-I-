import { Children, type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarStyles as s } from '@/theme';
import { FloatingActionButton } from './FloatingActionButton';

export type BottomTabBarProps = ViewProps & { children: ReactNode; splitAt?: number; createLabel: string; onCreate: () => void };

/**
 * Barra inferior con botón "+" al centro. Los primeros `splitAt` hijos van a la izquierda del botón y el resto a la derecha.
 * Se usa como hijo de `<TabList asChild>`.
 */
export function BottomTabBar({ children, splitAt = 2, createLabel, onCreate, style, ...rest }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const items = Children.toArray(children);
  return (
    <View pointerEvents="box-none" {...rest} style={[style, s.wrap]}>
      <View pointerEvents="box-none" style={s.inner}>
        <View accessible={false} style={s.surface} />
        <View style={[s.row, { paddingBottom: insets.bottom }]}>
          {items.slice(0, splitAt)}
          <View pointerEvents="box-none" style={s.fabSlot}>
            <FloatingActionButton label={createLabel} onPress={onCreate} />
          </View>
          {items.slice(splitAt)}
        </View>
      </View>
    </View>
  );
}
