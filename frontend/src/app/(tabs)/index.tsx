import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { FeaturedMatchCard, IconButton, LocationPill, MatchCard, QuickActionTile, SectionHeader, StatCard, UrgentCallCard } from '@/components/sport';
import { FEATURED, MATCHES, QUICK_ACTIONS, RANKING, URGENT_CALL } from '@/components/sport/home-data';
import { ScreenStyles as s } from '@/theme';

// Destino de cada atajo, en el mismo orden que QUICK_ACTIONS:
// Buscar Cancha, Reto Relámpago, Bolsa de Refuerzos, Subir Resultado.
const QUICK_ROUTES = ['/buscar-cancha', '/retos', '/refuerzos', '/subir-resultado'] as const;

export default function HomeScreen() {
  const router = useRouter();
  const todo = (action: string) => () => console.log(action);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView style={s.scroll} contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <View style={s.header}>
          <Image source={require('@/assets/images/pelotaya/logo.png')} accessibilityLabel="PelotaYa" style={s.logo} />
          <LocationPill label="PACHACÁMAC" onPress={todo('cambiar-zona')} />
          <View style={s.headerRight}>
            <IconButton symbol="🔔" label="Notificaciones" size="sm" showDot onPress={() => router.push('/notificaciones')} />
            <Image source={require('@/assets/images/pelotaya/player.png')} accessibilityLabel="Tu perfil" style={s.headerAvatar} />
          </View>
        </View>

        <UrgentCallCard {...URGENT_CALL} onJoin={() => router.push('/pichanga/7')} onShare={todo('compartir-aviso')} />

        <View style={s.quickRow}>
          {QUICK_ACTIONS.map(({ id, ...action }, i) => (
            <QuickActionTile key={id} {...action} onPress={() => router.push(QUICK_ROUTES[i] ?? '/buscar-cancha')} />
          ))}
        </View>

        <View style={s.block}>
          <SectionHeader title="Pichanga Destacada" dot actionLabel="Ver todas" onAction={() => router.push('/torneos')} />
          <FeaturedMatchCard {...FEATURED} onJoin={() => router.push('/pichanga/8')} />
        </View>

        <View style={s.block}>
          <SectionHeader title="Tus Pichangas Confirmadas" badge={`${MATCHES.length} PRÓXIMA`} />
          {MATCHES.map(({ id, ...match }) => (
            <MatchCard key={id} {...match} onPress={() => router.push(`/pichanga/${id}`)} />
          ))}
        </View>

        <View style={s.block}>
          <SectionHeader title="Ranking Barrio Pachacámac & Lurín" badge="SEMANA 12" badgeTone="neutral" />
          <View style={s.statRow}>
            {RANKING.map(({ id, ...item }) => (
              <StatCard key={id} {...item} onPress={() => router.push('/stats')} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}