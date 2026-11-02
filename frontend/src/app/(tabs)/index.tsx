import { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { EmptyState, IconButton, PrimaryButton, SearchInput } from '@/components/sport';
import { PichangaCard } from '@/components/sport/PichangaCard';
import { useSesion } from '@/context/SesionContext';
import { useAppSelector } from '@/store/hooks';
import { selectPichangas, type EstadoPichanga } from '@/store/pichangasSlice';
import { ScreenStyles as s } from '@/theme';
import { PichangaStyles as f } from '@/theme/pichanga-styles';
const filters = [['todas', 'Todas'], ['abierta', 'Abiertas'], ['completa', 'Completas'], ['cancelada', 'Canceladas']] as const;
export default function HomeScreen() {
  const router = useRouter();
  const { usuario } = useSesion();
  const items = useAppSelector(selectPichangas);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<EstadoPichanga | 'todas'>('todas');
  const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const data = items.filter(p => (filter === 'todas' || p.estado === filter) && normalize(`${p.titulo} ${p.cancha} ${p.zona}`).includes(normalize(query.trim())));
  return <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
    <FlatList style={s.scroll} contentContainerStyle={[s.content, f.content]} data={data} keyExtractor={item => item.id} keyboardShouldPersistTaps="handled"
      ListHeaderComponent={<View style={f.field}>
        <View style={s.header}>
          <Image source={require('@/assets/images/pelotaya/logo.png')} accessibilityLabel="PelotaYa" style={s.logo} />
          <View style={f.grow}><Text style={s.heading}>Hola, {usuario?.nombre}</Text><Text style={s.subtitle}>Organiza tu próxima pichanga</Text></View>
          <IconButton symbol="🔔" label="Notificaciones" size="sm" onPress={() => router.push('/notificaciones')} />
        </View>
        <Text style={s.title}>Mis pichangas</Text>
        <Text style={s.subtitle}>{items.length} registradas · {items.filter(p => p.estado === 'abierta').length} abiertas</Text>
        <PrimaryButton label="Crear pichanga" onPress={() => router.push('/crear')} />
        <SearchInput value={query} onChangeText={setQuery} placeholder="Buscar por título, cancha o zona" />
        <View style={s.row}>{filters.map(([key, label]) => <PrimaryButton key={key} label={label} variant={filter === key ? 'primary' : 'secondary'} onPress={() => setFilter(key)} />)}</View>
        <Text accessibilityLiveRegion="polite" style={s.subtitle}>{data.length} resultados</Text>
      </View>}
      renderItem={({ item }) => <PichangaCard pichanga={item} onPress={() => router.push(`/pichanga/${item.id}`)} />}
      ListEmptyComponent={<EmptyState title={items.length ? 'Sin coincidencias' : 'Tu primera pichanga empieza aquí'} message={items.length ? 'Prueba otro título, cancha, zona o estado.' : 'Crea una pichanga y aparecerá en esta lista.'} actionLabel={items.length ? 'Limpiar filtros' : 'Crear pichanga'} onAction={() => { if (items.length) { setQuery(''); setFilter('todas'); } else router.push('/crear'); }} />}
    />
  </SafeAreaView>;
}
