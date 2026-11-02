import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/sport';
import { useSesion } from '@/context/SesionContext';
import { FormField } from '@/components/sport/FormField';
import { PichangaStyles as f } from '@/theme/pichanga-styles';
import { ScreenStyles as s } from '@/theme';

// Login de prueba (sin backend): acepta cualquier correo. La autenticación real llega en la S12.
export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const { iniciarSesion } = useSesion();

  const entrar = () => {
    const limpio = correo.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(limpio)) return setError('Escribe un correo válido.');
    iniciarSesion({ nombre: limpio.split('@')[0], correo: limpio });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text accessibilityRole="header" style={s.title}>Entra a PelotaYa</Text>
        <Text style={s.subtitle}>Sesión de demostración: no necesita contraseña ni verifica tu identidad.</Text>
        <FormField label="Correo electrónico"
          value={correo}
          onChangeText={setCorreo}
          placeholder="correo@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {!!error && <Text accessibilityRole="alert" style={f.error}>{error}</Text>}
        <PrimaryButton label="Ingresar" onPress={entrar} />
      </ScrollView>
    </SafeAreaView>
  );
}
