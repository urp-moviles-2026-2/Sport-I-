import { useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { PrimaryButton } from '@/components/sport';
import { useAppDispatch } from '@/store/hooks';
import { agregarPichanga } from '@/store/pichangasSlice';
import { ScreenStyles as s } from '@/theme';

// TODO: reemplazar los TextInput por el campo de texto del equipo para usar el tema.
const input = { borderWidth: 1, borderRadius: 12, padding: 14, color: '#FFFFFF', borderColor: '#555' } as const;

export default function CrearPichangaScreen() {
  const [titulo, setTitulo] = useState('');
  const [cancha, setCancha] = useState('');
  const [hora, setHora] = useState('');
  const [cupos, setCupos] = useState('1');
  const [precio, setPrecio] = useState('10');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const valido = titulo.trim().length > 0;

  const guardar = () => {
    if (!valido) return;
    dispatch(
      agregarPichanga({
        titulo: titulo.trim(),
        cancha: cancha.trim() || 'Por definir',
        zona: 'Pachacámac',
        hora: hora.trim() || 'Por definir',
        cupos: Number(cupos) || 1,
        precio: Number(precio) || 0,
      }),
    );
    router.back();
  };

  return (
    <SafeAreaView edges={['left', 'right']} style={s.page}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text accessibilityRole="header" style={s.title}>Nueva pichanga</Text>
        <TextInput value={titulo} onChangeText={setTitulo} placeholder="Título (ej. Falta 1 para hoy)" placeholderTextColor="#888" style={input} />
        <TextInput value={cancha} onChangeText={setCancha} placeholder="Cancha" placeholderTextColor="#888" style={input} />
        <TextInput value={hora} onChangeText={setHora} placeholder="Hora (ej. 8:30 PM)" placeholderTextColor="#888" style={input} />
        <TextInput value={cupos} onChangeText={setCupos} placeholder="Cupos" keyboardType="numeric" placeholderTextColor="#888" style={input} />
        <TextInput value={precio} onChangeText={setPrecio} placeholder="Precio por persona (S/)" keyboardType="numeric" placeholderTextColor="#888" style={input} />
        <PrimaryButton label="Guardar" onPress={guardar} disabled={!valido} />
      </ScrollView>
    </SafeAreaView>
  );
}
