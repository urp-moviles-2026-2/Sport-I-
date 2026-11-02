import { useRouter } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { selectPichangas } from '@/store/pichangasSlice';
import { ScreenStyles as s } from '@/theme';
import { PrimaryButton } from '@/components/sport';
export default function StatsScreen() {
  const router = useRouter();
  const items = useAppSelector(selectPichangas);
  return <ScrollView style={s.page} contentContainerStyle={s.content}>
    <Text style={s.title}>Mi actividad</Text>
    <Text style={s.subtitle}>Resumen de tus pichangas guardadas en este dispositivo.</Text>
    <Text style={s.heading}>{items.length} pichangas registradas</Text>
    <Text style={s.notice}>{items.filter(p => p.estado === 'abierta').length} abiertas</Text>
    <Text style={s.notice}>{items.filter(p => p.estado === 'completa').length} completas</Text>
    <Text style={s.subtitle}>{items.filter(p => p.estado === 'cancelada').length} canceladas</Text>
    <Text style={s.subtitle}>Los conteos se actualizan al crear, cambiar el estado o eliminar.</Text>
    <PrimaryButton label="Crear pichanga" onPress={() => router.push('/crear')} />
    <PrimaryButton label="Ver mis pichangas" variant="secondary" onPress={() => router.push('/')} />
    <PrimaryButton label="Ver mi perfil" variant="secondary" onPress={() => router.push('/perfil')} />
  </ScrollView>;
}
