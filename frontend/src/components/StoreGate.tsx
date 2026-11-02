import { useEffect, useState, type ReactNode } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { store } from '@/store';
import { iniciarPersistencia } from '@/store/persistencia';
import { PrimaryButton } from '@/components/sport/PrimaryButton';
import { ScreenStyles as s, SportColors } from '@/theme';
import { PichangaStyles as f } from '@/theme/pichanga-styles';
export function StoreGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    let stop: undefined | (() => void);
    iniciarPersistencia(store, message => { if (active) setError(message); }).then(unsubscribe => {
      if (!active) return unsubscribe();
      stop = unsubscribe; setError(''); setReady(true);
    }).catch(() => { if (active) setError('No se pudieron recuperar tus pichangas. Reintenta sin borrar tus datos.'); });
    return () => { active = false; stop?.(); };
  }, [attempt]);
  if (!ready) return <View style={s.page}><View style={s.content}>
    <Text style={s.heading}>Preparando PelotaYa</Text>
    {error ? <><Text accessibilityRole="alert" style={f.error}>{error}</Text><PrimaryButton label="Reintentar" onPress={() => { setError(''); setAttempt(n => n + 1); }} /></> : <ActivityIndicator accessibilityLabel="Cargando pichangas" color={SportColors.primary} />}
  </View></View>;
  return <View style={s.page}>{!!error && <Text accessibilityRole="alert" style={f.error}>{error}</Text>}{children}</View>;
}
