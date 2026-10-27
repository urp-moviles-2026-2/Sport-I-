import { useRouter } from 'expo-router';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';

import { BottomTabBar, BottomTabButton } from '@/components/sport';
import { BottomTabBarStyles as s, ScreenStyles } from '@/theme';

/** Barra inferior de PelotaYa: cinco tabs con acción de crear centrada encima. */
export default function AppTabs() {
  const router = useRouter();
  return (
    <Tabs style={ScreenStyles.tabs}>
      <TabSlot style={ScreenStyles.slot} />
      <TabList asChild>
        <BottomTabBar createLabel="Crear pichanga" onCreate={() => router.push('/crear')}>
          <TabTrigger name="index" href="/" asChild>
            <BottomTabButton label="Inicio" iconName="home-outline" activeIconName="home" />
          </TabTrigger>
          <TabTrigger name="retos" href="/retos" asChild>
            <BottomTabButton label="Retos" iconName="football-outline" activeIconName="football" />
          </TabTrigger>
          <TabTrigger name="torneos" href="/torneos" asChild>
            <BottomTabButton label="Torneos" iconName="trophy-outline" activeIconName="trophy" />
          </TabTrigger>
          <TabTrigger name="stats" href="/stats" asChild>
            <BottomTabButton label="Stats" iconName="stats-chart-outline" activeIconName="stats-chart" />
          </TabTrigger>
          <TabTrigger name="perfil" href="/perfil" asChild>
            <BottomTabButton label="Perfil" iconName="person-outline" activeIconName="person" />
          </TabTrigger>
          {/* Ruta sin botón en la barra: se abre desde Perfil. */}
          <TabTrigger name="catalogo" href="/catalogo" style={s.hidden} />
        </BottomTabBar>
      </TabList>
    </Tabs>
  );
}
