import { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/sport';
import { usePichangas } from '@/state/pichangas';
import { ScreenStyles as s, SportColors } from '@/theme';
import { PichangaStyles as f } from '@/theme/pichanga-styles';

export default function CrearScreen() {
  const router = useRouter();
  const { create, ready, error } = usePichangas();
  const [values, setValues] = useState({ title: '', venue: '', date: '', time: '', capacity: '14', price: '18' });
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  async function publish() {
    if (saving) return;
    const { title, venue, date, time, capacity } = values;
    const price = values.price.replace(',', '.');
    const when = new Date(`${date}T${time}:00`);
    if (!title.trim() || !venue.trim()) return setMessage('Escribe el nombre y la cancha.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || !Number.isFinite(when.getTime()) || when.getFullYear() !== Number(date.slice(0, 4)) || when.getMonth() + 1 !== Number(date.slice(5, 7)) || when.getDate() !== Number(date.slice(8)) || when <= new Date()) return setMessage('Indica una fecha y hora futuras válidas: AAAA-MM-DD y HH:MM.');
    if (!Number.isInteger(Number(capacity)) || Number(capacity) < 2 || Number(capacity) > 40) return setMessage('Los cupos deben ser un entero entre 2 y 40.');
    if (!price.trim() || !Number.isFinite(Number(price)) || Number(price) < 0) return setMessage('Escribe un precio válido, desde S/ 0.');
    setSaving(true); setMessage('');
    try {
      const id = await create({ title: title.trim(), venue: venue.trim(), date, time, capacity: Number(capacity), price: Number(price) });
      router.replace(`/pichanga/${id}`);
    } catch { setMessage('No se pudo guardar. Vuelve a intentarlo.'); }
    finally { setSaving(false); }
  }
  const fields = [['title', 'Nombre de la pichanga', 'Ej. Clásico del barrio'], ['venue', 'Cancha y distrito', 'Ej. El Golazo, Pachacámac'], ['date', 'Fecha (AAAA-MM-DD)', '2026-11-01'], ['time', 'Hora (24 horas)', '19:00'], ['capacity', 'Cupos totales (incluyéndote)', '14'], ['price', 'Cuota por persona (S/)', '18']] as const;
  return <ScrollView style={s.page} contentContainerStyle={[s.content, f.content]} keyboardShouldPersistTaps="handled">
    <Text style={s.heading}>Organiza tu próxima pichanga</Text>
    <Text style={s.subtitle}>Se guardará en este dispositivo. Tu lugar se reserva al publicar.</Text>
    {fields.map(([key, label, placeholder]) => <View key={key} style={f.field}>
      <Text style={f.label}>{label}</Text>
      <TextInput accessibilityLabel={label} value={values[key]} placeholder={placeholder} placeholderTextColor={SportColors.muted} style={f.input} maxLength={key === 'title' || key === 'venue' ? 100 : 10} keyboardType={key === 'capacity' ? 'number-pad' : key === 'price' ? 'decimal-pad' : 'default'} onChangeText={value => setValues(v => ({ ...v, [key]: value }))} />
    </View>)}
    {!!(message || error) && <Text accessibilityRole="alert" style={f.error}>{message || error}</Text>}
    <PrimaryButton label={saving ? 'Guardando…' : 'Publicar pichanga'} disabled={!ready || saving} onPress={publish} />
    <PrimaryButton label="Volver a Inicio" variant="secondary" onPress={() => router.replace('/')} />
  </ScrollView>;
}
