import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton } from '@/components/sport';
import { crearActividad, getMisActividades, type ActividadPrivada } from '@/services/actividades';
import { ScreenStyles as s } from '@/theme';
export default function MisActividades() {
  const [items, setItems] = useState<ActividadPrivada[]>([]);
  const [estado, setEstado] = useState<'cargando' | 'error' | 'listo'>('cargando');
  const [mensaje, setMensaje] = useState('');
  const [titulo, setTitulo] = useState('');
  const [enviando, setEnviando] = useState(false);
  const cargar = useCallback(async () => {
    setEstado('cargando'); setMensaje('');
    try { setItems(await getMisActividades()); setEstado('listo'); }
    catch { setMensaje('No se pudieron cargar tus actividades.'); setEstado('error'); }
  }, []);
  useEffect(() => { void cargar(); }, [cargar]);
  const agregar = async () => {
    if (!titulo.trim() || enviando) return;
    setEnviando(true);
    setMensaje('');
    try { await crearActividad(titulo.trim()); setTitulo(''); await cargar(); }
    catch { setMensaje('No se pudo guardar tu actividad.'); }
    finally { setEnviando(false); }
  };
  return <SafeAreaView style={s.page}><View style={s.content}>
    <Text style={s.title}>Mis actividades privadas</Text>
    <Text style={s.subtitle}>Solo tú puedes consultar estas actividades en Supabase.</Text>
    <TextInput accessibilityLabel="Título de actividad" value={titulo} onChangeText={setTitulo} placeholder="Nueva actividad" style={{ borderWidth: 1, padding: 12, borderRadius: 8 }} />
    <PrimaryButton label={enviando ? 'Guardando...' : 'Guardar actividad'} onPress={agregar} disabled={enviando || !titulo.trim()} />
    {estado === 'cargando' ? <ActivityIndicator accessibilityLabel="Cargando actividades" /> : null}
    {mensaje ? <Text accessibilityRole="alert">{mensaje}</Text> : null}
    {estado === 'error' ? <PrimaryButton label="Reintentar" onPress={() => void cargar()} /> : null}
    {estado === 'listo' && !items.length ? <Text>No tienes actividades todavía.</Text> : null}
    {estado === 'listo' ? <FlatList data={items} keyExtractor={x => String(x.id)} renderItem={({ item }) => <Text style={{ paddingVertical: 8 }}>{item.titulo}</Text>} /> : null}
  </View></SafeAreaView>;
}
