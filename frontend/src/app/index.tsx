import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeaturedMatchCard, IconButton, LocationPill, MatchCard, QuickActionTile, SectionHeader, StatCard, UrgentCallCard } from '@/components/sport';
import { FEATURED, MATCHES, QUICK_ACTIONS, RANKING, URGENT_CALL } from '@/components/sport/home-data';
import { ScreenStyles as s } from '@/theme';

/** Pantalla principal de PelotaYa: aviso urgente, atajos, pichanga destacada, pichangas confirmadas y ranking. Datos locales de ejemplo. */
export default function HomeScreen() {
  // Los botones solo registran la acción; la navegación llega después.
  const todo = (action: string) => () => console.log(action);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <View style={s.header}>
          <Image source={require('@/assets/images/pelotaya/logo.png')} accessibilityLabel="PelotaYa" style={s.logo} />
          <LocationPill label="PACHACÁMAC" onPress={todo('cambiar-zona')} />
          <View style={s.headerRight}>
            <IconButton symbol="🔔" label="Notificaciones" size="sm" showDot onPress={todo('notificaciones')} />
            <Image source={require('@/assets/images/pelotaya/player.png')} accessibilityLabel="Tu perfil" style={s.headerAvatar} />
          </View>
        </View>

        <UrgentCallCard {...URGENT_CALL} onJoin={todo('voy-al-toque')} onShare={todo('compartir-aviso')} />

        <View style={s.quickRow}>
          {QUICK_ACTIONS.map(({ id, ...action }) => (
            <QuickActionTile key={id} {...action} onPress={todo(`atajo:${id}`)} />
          ))}
        </View>

        <View style={s.block}>
          <SectionHeader title="Pichanga Destacada" dot actionLabel="Ver todas" onAction={todo('ver-todas')} />
          <FeaturedMatchCard {...FEATURED} onJoin={todo('unirse-destacada')} />
        </View>

        <View style={s.block}>
          <SectionHeader title="Tus Pichangas Confirmadas" badge={`${MATCHES.length} PRÓXIMA`} />
          {MATCHES.map(({ id, ...match }) => (
            <MatchCard key={id} {...match} onPress={todo(`pichanga:${id}`)} />
          ))}
        </View>

        <View style={s.block}>
          <SectionHeader title="Ranking Barrio Pachacámac & Lurín" badge="SEMANA 12" badgeTone="neutral" />
          <View style={s.statRow}>
            {RANKING.map(({ id, ...item }) => (
              <StatCard key={id} {...item} onPress={todo(`ranking:${id}`)} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
