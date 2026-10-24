import { useState, type ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AvailabilityToggle, AvatarStack, BottomTabButton, EmptyState, FairPlayBadge, FeaturedMatchCard, FloatingActionButton, IconButton, LocationPill, MatchCard, QuickActionTile, UrgentCallCard, PlayerCard, PositionChip, PrimaryButton, SearchInput, SectionHeader, StatCard, StatusBadge } from '@/components/sport';
import { FEATURED, MATCHES, QUICK_ACTIONS, RANKING, URGENT_CALL } from '@/components/sport/home-data';
import { PLAYERS, POSITIONS } from '@/components/sport/players';
import { ScreenStyles as s } from '@/theme';

function Demo({ name, note, result, children }: { name: string; note: string; result?: string; children: ReactNode }) {
  return (
    <View style={s.demoBlock}>
      <Text accessibilityRole="header" style={s.demoName}>{name}</Text>
      <Text style={s.demoNote}>{note}</Text>
      {children}
      {!!result && <Text accessibilityLiveRegion="polite" style={s.demoResult}>{result}</Text>}
    </View>
  );
}

/** Catálogo: cada componente de PelotaYa aislado, con sus variantes y estados, para probarlo en vivo. */
export default function CatalogScreen() {
  const [presses, setPresses] = useState(0);
  const [chip, setChip] = useState<string>('Todos');
  const [available, setAvailable] = useState(true);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [cardTapped, setCardTapped] = useState('');
  const [score, setScore] = useState(4.5);
  const [showEmpty, setShowEmpty] = useState(true);
  const [homeTapped, setHomeTapped] = useState('');
  const [fabCount, setFabCount] = useState(0);
  const [urgent, setUrgent] = useState('');
  const [zone, setZone] = useState(0);
  const [tab, setTab] = useState('Inicio');

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text accessibilityRole="header" style={s.title}>Catálogo de componentes</Text>
        <Text style={s.subtitle}>Interactúa con cada componente. Los estilos salen del tema en src/theme/.</Text>

        <Demo name="PrimaryButton" note="Acción. Variantes: primary, orange, secondary y disabled. Evento: onPress." result={`Presionado ${presses} ${presses === 1 ? 'vez' : 'veces'}`}>
          <PrimaryButton label="Primary" onPress={() => setPresses(n => n + 1)} />
          <PrimaryButton label="Orange" variant="orange" onPress={() => setPresses(n => n + 1)} />
          <PrimaryButton label="Secondary" variant="secondary" onPress={() => setPresses(0)} />
          <PrimaryButton label="Disabled" disabled onPress={() => {}} />
          <PrimaryButton label="Con style propio (ancho completo)" style={s.fullWidth} onPress={() => setPresses(n => n + 1)} />
        </Demo>

        <Demo name="PositionChip" note="Selección. Estado activo controlado desde fuera. Evento: onPress." result={`Seleccionado: ${chip}`}>
          <View style={s.chips}>
            {POSITIONS.map(label => (
              <PositionChip key={label} label={label} active={chip === label} onPress={() => setChip(label)} />
            ))}
          </View>
        </Demo>

        <Demo name="AvailabilityToggle" note="Acción. Interruptor controlado: value + onChange(nuevoValor)." result={available ? 'Disponible' : 'No disponible'}>
          <AvailabilityToggle label="Disponible para jugar" value={available} onChange={setAvailable} />
        </Demo>

        <Demo name="SearchInput" note="Entrada controlada: value + onChangeText. Enter dispara onSubmit; la × limpia." result={submitted ? `Buscaste: "${submitted}"` : `Escribiendo: "${text}"`}>
          <SearchInput
            value={text}
            onChangeText={value => {
              setText(value);
              setSubmitted('');
            }}
            onSubmit={() => setSubmitted(text)}
          />
        </Demo>

        <Demo name="PlayerCard" note="Contenedor de datos. Con y sin foto. Evento: onPress." result={cardTapped ? `Tocaste a ${cardTapped}` : 'Toca una tarjeta'}>
          {PLAYERS.slice(0, 2).map(p => (
            <PlayerCard key={p.name} {...p} onPress={() => setCardTapped(p.name)} />
          ))}
        </Demo>

        <Demo name="FairPlayBadge" note="Dato. Cambia la puntuación con los botones." result={`Puntuación actual: ${score}`}>
          <FairPlayBadge score={score} />
          <View style={s.row}>
            <PrimaryButton label="− 0.1" variant="secondary" onPress={() => setScore(v => Math.max(0, Math.round((v - 0.1) * 10) / 10))} />
            <PrimaryButton label="+ 0.1" variant="secondary" onPress={() => setScore(v => Math.min(5, Math.round((v + 0.1) * 10) / 10))} />
          </View>
        </Demo>

        <Demo name="EmptyState" note="Contenedor para listas vacías, con acción opcional. Evento: onAction.">
          {showEmpty ? (
            <EmptyState title="No encontramos jugadores" message="Prueba otro nombre, equipo o posición." actionLabel="Ocultar" onAction={() => setShowEmpty(false)} />
          ) : (
            <PrimaryButton label="Mostrar de nuevo" variant="secondary" onPress={() => setShowEmpty(true)} />
          )}
        </Demo>

        <Demo name="StatusBadge y SectionHeader" note="Dato. Tonos: primary, orange y neutral. SectionHeader agrupa título + etiqueta.">
          <SectionHeader title="Tus Pichangas Confirmadas" badge="1 PRÓXIMA" />
          <View style={s.row}>
            <StatusBadge label="PRIMARY" />
            <StatusBadge label="ORANGE" tone="orange" />
            <StatusBadge label="NEUTRAL" tone="neutral" />
          </View>
        </Demo>

        <Demo name="AvatarStack" note="Dato. Iniciales superpuestas con círculo +N.">
          <AvatarStack initials={['RQ', 'JT', 'MC']} extra={9} />
        </Demo>

        <Demo name="MatchCard" note="Contenedor de datos de una pichanga. Evento: onPress." result={homeTapped ? `Tocaste: ${homeTapped}` : 'Toca la tarjeta o una de ranking'}>
          {MATCHES.map(({ id, ...m }) => (
            <MatchCard key={id} {...m} onPress={() => setHomeTapped(m.title)} />
          ))}
          <View style={s.row}>
            {RANKING.map(({ id, ...r }) => (
              <StatCard key={id} {...r} style={s.fullWidth} onPress={() => setHomeTapped(r.name)} />
            ))}
          </View>
        </Demo>

        <Demo name="FloatingActionButton" note="Acción. Botón circular principal. Evento: onPress." result={`Presionado ${fabCount} ${fabCount === 1 ? 'vez' : 'veces'}`}>
          <FloatingActionButton label="Crear pichanga" onPress={() => setFabCount(n => n + 1)} />
        </Demo>

        <Demo name="LocationPill e IconButton" note="Acción. Zona actual y botón circular con punto de notificación. Evento: onPress." result={`Zona: ${['PACHACÁMAC', 'LURÍN', 'MANCHAY'][zone % 3]}`}>
          <View style={s.row}>
            <LocationPill label={['PACHACÁMAC', 'LURÍN', 'MANCHAY'][zone % 3]} onPress={() => setZone(n => n + 1)} />
            <IconButton symbol="🔔" label="Notificaciones" size="sm" showDot onPress={() => setZone(n => n + 1)} />
          </View>
        </Demo>

        <Demo name="UrgentCallCard" note="Contenedor. Aviso de jugador faltante. Eventos: onJoin y onShare." result={urgent || 'Toca un botón'}>
          <UrgentCallCard {...URGENT_CALL} onJoin={() => setUrgent('Te uniste a la pichanga')} onShare={() => setUrgent('Aviso compartido')} />
        </Demo>

        <Demo name="QuickActionTile" note="Acción. Atajos con ícono. Evento: onPress." result={urgent || 'Toca un atajo'}>
          <View style={s.quickRow}>
            {QUICK_ACTIONS.map(({ id, ...a }) => (
              <QuickActionTile key={id} {...a} onPress={() => setUrgent(a.label)} />
            ))}
          </View>
        </Demo>

        <Demo name="FeaturedMatchCard" note="Contenedor de datos con foto opcional (imageSource). Evento: onJoin." result={urgent || 'Toca el botón naranja'}>
          <FeaturedMatchCard {...FEATURED} onJoin={() => setUrgent('Te uniste al equipo')} />
        </Demo>

        <Demo name="BottomTabButton" note="Acción. Botón de la barra inferior; el activo se pinta en lima. Evento: onPress." result={`Pestaña activa: ${tab}`}>
          <View style={s.row}>
            {([['Inicio', '⌂'], ['Retos', '⚔'], ['Stats', '▥']] as const).map(([label, symbol]) => (
              <BottomTabButton key={label} label={label} symbol={symbol} isFocused={tab === label} onPress={() => setTab(label)} />
            ))}
          </View>
        </Demo>
      </ScrollView>
    </SafeAreaView>
  );
}