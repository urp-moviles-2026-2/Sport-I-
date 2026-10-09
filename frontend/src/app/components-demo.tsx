import { useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmptyState, FairPlayBadge, PlayerCard, PositionChip, PrimaryButton, SearchInput } from '@/components/sport';
import { SportColors as c } from '@/constants/sport-theme';

const players = [
  { name: "Carlos 'Chispa' Mendoza", position: 'Mediocampista', team: 'Deportivo Pachacámac Central', fairPlay: 4.9, avatarSource: require('@/assets/images/pelotaya/player.png') },
  { name: 'Renzo Quispe', position: 'Delantero', team: 'Los Galácticos de Manchay', fairPlay: 4.8 },
  { name: 'Luis Ramírez', position: 'Defensa', team: 'Los Amigos del Jueves', fairPlay: 4.6 },
  { name: 'Diego Torres', position: 'Arquero', team: 'Sport Juventud', fairPlay: 4.7 },
];
const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

/** Muestra interactiva: datos locales; no crea reservas ni envía invitaciones. */
export default function ComponentsDemo() {
  const [query, setQuery] = useState('');
  const [position, setPosition] = useState('Todos');
  const [selected, setSelected] = useState<(typeof players)[number] | null>(null);
  const [notice, setNotice] = useState('');
  const filtered = players.filter(p => (position === 'Todos' || position === p.position) && normalize(`${p.name} ${p.team}`).includes(normalize(query.trim())));
  function reset() { setQuery(''); setPosition('Todos'); setNotice(''); }

  return <SafeAreaView style={s.page}>
    <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <View style={s.header}>
        <Image source={require('@/assets/images/pelotaya/logo.png')} accessibilityLabel="PelotaYa" style={s.logo} />
        <View style={s.location}><Text style={s.locationText}>⌖  PACHACÁMAC</Text></View>
        <Image source={require('@/assets/images/pelotaya/player.png')} accessibilityLabel="Jugador de ejemplo" style={s.avatar} />
      </View>
      <View style={s.hero}>
        <Text style={s.eyebrow}>● BOLSA DE REFUERZOS</Text>
        <Text accessibilityRole="header" style={s.title}>¡Falta uno para la pichanga!</Text>
        <Text style={s.subtitle}>Encuentra a tu próximo compañero de equipo.</Text>
        <PrimaryButton label="⚡ Buscar refuerzos" onPress={() => { reset(); setNotice('Explora los jugadores disponibles a continuación.'); }} />
      </View>
      <SearchInput value={query} onChangeText={text => { setQuery(text); setNotice(''); }} onSubmit={() => setNotice(`${filtered.length} jugadores encontrados`)} />
      <View style={s.chips}>{['Todos', 'Arquero', 'Defensa', 'Mediocampista', 'Delantero'].map(label =>
        <PositionChip key={label} label={label} active={position === label} onPress={() => { setPosition(label); setNotice(''); }} />
      )}</View>
      <View style={s.section}><Text accessibilityRole="header" style={s.heading}>Jugadores disponibles</Text><Text style={s.count}>{filtered.length} EN DEMO</Text></View>
      {filtered.map(p => <PlayerCard key={p.name} {...p} onPress={() => setSelected(p)} />)}
      {!filtered.length && <EmptyState title="No encontramos jugadores" message="Prueba otro nombre, equipo o posición para encontrar tu refuerzo." actionLabel="Limpiar filtros" onAction={reset} />}
      {!!notice && <Text accessibilityLiveRegion="polite" style={s.notice}>{notice}</Text>}
      <View style={s.panel}>
        <Text style={s.heading}>Arma tu próximo partido</Text>
        <Text style={s.subtitle}>Prueba las acciones de PelotaYa con datos de ejemplo.</Text>
        <PrimaryButton label="Lanzar reto" variant="orange" onPress={() => setNotice('Reto de ejemplo: esta muestra no publica partidos.')} />
        <PrimaryButton label="Ver todos los jugadores" variant="secondary" onPress={reset} />
        <PrimaryButton label="Selecciona un jugador para invitar" disabled onPress={() => {}} />
      </View>
    </ScrollView>
    <Modal visible={!!selected} transparent animationType="fade" onRequestClose={() => setSelected(null)}>
      <View style={s.backdrop}><View accessibilityViewIsModal style={s.profile}>
        {selected && <>
          <Text style={s.eyebrow}>PERFIL DEL PELOTERO</Text>
          <Text accessibilityRole="header" style={s.heading}>{selected.name}</Text>
          <Text style={s.subtitle}>{selected.position} · {selected.team}</Text>
          <FairPlayBadge score={selected.fairPlay} />
          <PrimaryButton label="Invitar a la pichanga" onPress={() => { setNotice(`Invitación de ejemplo para ${selected.name}. No se envió ningún mensaje.`); setSelected(null); }} />
          <PrimaryButton label="Cerrar perfil" variant="secondary" onPress={() => setSelected(null)} />
        </>}
      </View></View>
    </Modal>
  </SafeAreaView>;
}

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 520, alignSelf: 'center', padding: 20, paddingTop: 76, paddingBottom: 110, gap: 18 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 }, logo: { width: 40, height: 40 },
  location: { padding: 14, borderRadius: 30, backgroundColor: c.surface }, locationText: { color: c.text, fontSize: 12, fontWeight: '700' },
  avatar: { width: 38, height: 38, borderRadius: 19, marginLeft: 'auto' },
  hero: { backgroundColor: c.surface, borderRadius: 20, padding: 20, gap: 14, borderWidth: 1, borderColor: c.border },
  eyebrow: { color: c.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  title: { color: c.text, fontSize: 27, fontWeight: '800' }, subtitle: { color: c.muted, fontSize: 14, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, section: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  heading: { color: c.text, fontSize: 20, fontWeight: '700', flexShrink: 1 }, count: { color: c.primary, fontSize: 11, fontWeight: '700' },
  panel: { backgroundColor: c.surface, padding: 20, borderRadius: 20, gap: 14 }, notice: { color: c.primary, fontSize: 14, lineHeight: 22 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  profile: { width: '100%', maxWidth: 440, padding: 24, borderRadius: 20, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, gap: 18 },
});
