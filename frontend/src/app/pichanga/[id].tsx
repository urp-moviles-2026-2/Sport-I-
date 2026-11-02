import { useState } from 'react';
import { ScrollView, Share, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/sport';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cambiarEstado, eliminarPichanga, selectPichangaPorId } from '@/store/pichangasSlice';
import { ScreenStyles as s } from '@/theme';
import { PichangaStyles as f } from '@/theme/pichanga-styles';
export default function PichangaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = useAppSelector(selectPichangaPorId(id));
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState('');
  async function compartir() {
    if (!p) return;
    try { await Share.share({ message: `${p.titulo} — ${p.cancha}, ${p.zona}. Hora: ${p.hora}. S/ ${p.precio.toFixed(2)} por persona. Estado: ${p.estado}.` }); }
    catch { setMessage('No se pudo compartir desde este dispositivo.'); }
  }
  return <ScrollView style={s.page} contentContainerStyle={[s.content, f.content]}>
    <Stack.Screen options={{ title: p?.titulo ?? 'Pichanga' }} />
    {p ? <>
      <Text style={s.title}>{p.titulo}</Text>
      <View style={f.card}><Text style={s.heading}>{p.cancha}</Text><Text style={s.subtitle}>{p.zona} · {p.hora}</Text><Text style={s.notice}>S/ {p.precio.toFixed(2)} por persona</Text><Text style={s.subtitle}>Estado: {p.estado}</Text><Text style={s.subtitle}>{p.estado === 'abierta' ? `${p.cupos} cupos disponibles` : p.estado === 'completa' ? 'Sin cupos disponibles' : 'Encuentro cancelado'}</Text></View>
      {p.estado === 'abierta' && <PrimaryButton label="Marcar como completa" onPress={() => dispatch(cambiarEstado({ id: p.id, estado: 'completa' }))} />}
      {p.estado !== 'abierta' && p.cupos > 0 && <PrimaryButton label="Reabrir pichanga" onPress={() => dispatch(cambiarEstado({ id: p.id, estado: 'abierta' }))} />}
      {p.estado !== 'cancelada' && <PrimaryButton label="Cancelar pichanga" variant="secondary" onPress={() => dispatch(cambiarEstado({ id: p.id, estado: 'cancelada' }))} />}
      <PrimaryButton label="Compartir datos" variant="secondary" onPress={compartir} />
      {!!message && <Text accessibilityRole="alert" style={f.error}>{message}</Text>}
      {confirm ? <View style={f.card}><Text style={s.subtitle}>¿Eliminar esta pichanga? Esta acción no se puede deshacer.</Text><PrimaryButton label="Confirmar eliminación" variant="orange" onPress={() => { dispatch(eliminarPichanga(p.id)); router.replace('/'); }} /><PrimaryButton label="Conservar pichanga" variant="secondary" onPress={() => setConfirm(false)} /></View> : <PrimaryButton label="Eliminar pichanga" variant="secondary" onPress={() => setConfirm(true)} />}
    </> : <><Text style={s.heading}>Pichanga no encontrada</Text><Text style={s.subtitle}>El registro fue eliminado o no está guardado en este dispositivo.</Text></>}
    <PrimaryButton label="Volver a Inicio" variant="secondary" onPress={() => router.replace('/')} />
  </ScrollView>;
}
