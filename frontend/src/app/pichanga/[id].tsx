import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/sport';
import { usePichangas } from '@/state/pichangas';
import { ScreenStyles as s } from '@/theme';
import { PichangaStyles as f } from '@/theme/pichanga-styles';
export default function PichangaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { matches, ready, error, update } = usePichangas();
  const match = matches.find(m => m.id === id);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  async function toggle() {
    if (!match || saving) return;
    setSaving(true);
    try { await update(match.id, { joined: !match.joined }); setMessage(match.joined ? 'Saliste de la pichanga.' : 'Tu lugar está reservado.'); }
    catch { setMessage('No se pudo guardar el cambio. Intenta nuevamente.'); }
    finally { setSaving(false); }
  }
  return <ScrollView style={s.page} contentContainerStyle={[s.content, f.content]}>
    <Text style={s.title}>{match?.title ?? 'Pichanga'}</Text>
    {match ? <>
      <Text style={s.subtitle}>{match.venue}</Text>
      <Text style={s.notice}>{match.date} · {match.time}</Text>
      <Text style={s.subtitle}>S/ {match.price.toFixed(2)} por persona · {match.capacity} cupos totales</Text>
      <Text style={s.subtitle}>{match.joined ? 'Estás inscrito. Tienes un lugar reservado.' : 'Aún no estás inscrito.'}</Text>
      <Text style={s.subtitle}>Datos locales: no se comparten entre dispositivos.</Text>
      <PrimaryButton disabled={saving || new Date(`${match.date}T${match.time}:00`) <= new Date()} label={saving ? 'Guardando…' : match.joined ? 'Salir de la pichanga' : 'Unirme a la pichanga'} onPress={toggle} />
    </> : <Text style={s.subtitle}>{error || (!ready ? 'Cargando…' : id?.startsWith('local-') ? 'Esta pichanga no existe en este dispositivo.' : 'Esta tarjeta es una pichanga de ejemplo. Crea la tuya para gestionar tu inscripción.')}</Text>}
    {!!message && <Text accessibilityRole="alert" style={s.notice}>{message}</Text>}
    <PrimaryButton label="Crear pichanga" onPress={() => router.push('/crear')} />
    <PrimaryButton label="Volver a Inicio" variant="secondary" onPress={() => router.replace('/')} />
  </ScrollView>;
}
