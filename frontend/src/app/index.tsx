import { useState } from 'react';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState, FairPlayBadge, PlayerCard, PositionChip, PrimaryButton, SearchInput } from '@/components/sport';
import { normalize, PLAYERS, POSITIONS, type Player } from '@/components/sport/players';
import { ScreenStyles as s } from '@/theme';

/** Pantalla de Inicio de PelotaYa: bolsa de refuerzos con búsqueda, filtros y perfil. Datos locales de ejemplo. */
export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [position, setPosition] = useState<string>('Todos');
  const [selected, setSelected] = useState<Player | null>(null);
  const [notice, setNotice] = useState('');

  const filtered = PLAYERS.filter(
    p => (position === 'Todos' || position === p.position) && normalize(`${p.name} ${p.team}`).includes(normalize(query.trim())),
  );

  function reset() {
    setQuery('');
    setPosition('Todos');
    setNotice('');
  }

  return (
    <SafeAreaView style={s.page}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <View style={s.header}>
          <Image source={require('@/assets/images/pelotaya/logo.png')} accessibilityLabel="PelotaYa" style={s.logo} />
          <View style={s.location}>
            <Text style={s.locationText}>⌖  PACHACÁMAC</Text>
          </View>
          <Image source={require('@/assets/images/pelotaya/player.png')} accessibilityLabel="Jugador de ejemplo" style={s.headerAvatar} />
        </View>

        <View style={s.hero}>
          <Text style={s.eyebrow}>● BOLSA DE REFUERZOS</Text>
          <Text accessibilityRole="header" style={s.title}>¡Falta uno para la pichanga!</Text>
          <Text style={s.subtitle}>Encuentra a tu próximo compañero de equipo.</Text>
          <PrimaryButton
            label="⚡ Buscar refuerzos"
            onPress={() => {
              reset();
              setNotice('Explora los jugadores disponibles a continuación.');
            }}
          />
        </View>

        <SearchInput
          value={query}
          onChangeText={text => {
            setQuery(text);
            setNotice('');
          }}
          onSubmit={() => setNotice(`${filtered.length} jugadores encontrados`)}
        />

        <View style={s.chips}>
          {POSITIONS.map(label => (
            <PositionChip
              key={label}
              label={label}
              active={position === label}
              onPress={() => {
                setPosition(label);
                setNotice('');
              }}
            />
          ))}
        </View>

        <View style={s.section}>
          <Text accessibilityRole="header" style={s.heading}>Jugadores disponibles</Text>
          <Text style={s.count}>{filtered.length} EN DEMO</Text>
        </View>

        {filtered.map(p => (
          <PlayerCard key={p.name} {...p} onPress={() => setSelected(p)} />
        ))}

        {!filtered.length && (
          <EmptyState
            title="No encontramos jugadores"
            message="Prueba otro nombre, equipo o posición para encontrar tu refuerzo."
            actionLabel="Limpiar filtros"
            onAction={reset}
          />
        )}

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
        <View style={s.backdrop}>
          <View accessibilityViewIsModal style={s.profile}>
            {selected && (
              <>
                <Text style={s.eyebrow}>PERFIL DEL PELOTERO</Text>
                <Text accessibilityRole="header" style={s.heading}>{selected.name}</Text>
                <Text style={s.subtitle}>{selected.position} · {selected.team}</Text>
                <FairPlayBadge score={selected.fairPlay} />
                <PrimaryButton
                  label="Invitar a la pichanga"
                  onPress={() => {
                    setNotice(`Invitación de ejemplo para ${selected.name}. No se envió ningún mensaje.`);
                    setSelected(null);
                  }}
                />
                <PrimaryButton label="Cerrar perfil" variant="secondary" onPress={() => setSelected(null)} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
