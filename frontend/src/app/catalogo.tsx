import { useState, type ReactNode } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState, FairPlayBadge, PlayerCard, PositionChip, PrimaryButton, SearchInput } from '@/components/sport';
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
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [cardTapped, setCardTapped] = useState('');
  const [score, setScore] = useState(4.5);
  const [showEmpty, setShowEmpty] = useState(true);

  return (
    <SafeAreaView style={s.page}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
