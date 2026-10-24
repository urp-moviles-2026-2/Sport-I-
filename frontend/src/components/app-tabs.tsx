import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

import { BottomTabBar, BottomTabButton } from '@/components/sport';
import { BottomTabBarStyles as s, ScreenStyles } from '@/theme';

/** Barra inferior de PelotaYa: Inicio y Retos | botón "+" | Torneos, Stats y Perfil. */
export default function AppTabs() {
  return (
    <Tabs style={ScreenStyles.tabs}>
      <TabSlot style={ScreenStyles.slot} />
      <TabList asChild>
        <BottomTabBar createLabel="Crear pichanga" onCreate={() => console.log('crear-pichanga')}>
          <TabTrigger name="index" href="/" asChild>
            <BottomTabButton label="Inicio" symbol="⌂" />
          </TabTrigger>
          <TabTrigger name="retos" href="/retos" asChild>
            <BottomTabButton label="Retos" symbol="⚔" />
          </TabTrigger>
          <TabTrigger name="torneos" href="/torneos" asChild>
            <BottomTabButton label="Torneos" symbol="♛" />
          </TabTrigger>
          <TabTrigger name="stats" href="/stats" asChild>
            <BottomTabButton label="Stats" symbol="▥" />
          </TabTrigger>
          <TabTrigger name="perfil" href="/perfil" asChild>
            <BottomTabButton label="Perfil" symbol="☻" />
          </TabTrigger>
          {/* Ruta sin botón en la barra: se abre desde Perfil. */}
          <TabTrigger name="catalogo" href="/catalogo" style={s.hidden} />
        </BottomTabBar>
      </TabList>
    </Tabs>
  );
}
