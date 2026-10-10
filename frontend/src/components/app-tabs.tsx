import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { SportColors as c } from '@/theme';

export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={c.surface}
      indicatorColor={c.primarySoft}
      iconColor={{ default: c.muted, selected: c.primary }}
      labelStyle={{ default: { color: c.muted }, selected: { color: c.primary } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Inicio</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="catalogo">
        <NativeTabs.Trigger.Label>Catálogo</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}