import { useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/sport';
import { useSesion } from '@/context/SesionContext';
import { ScreenStyles as s } from '@/theme';

// Login de prueba (sin backend): acepta cualquier correo. La autenticación real llega en la S12.
export default function LoginScreen() {
  const [correo, setCorreo] = useState('');
  const { iniciarSesion } = useSesion();

  const entrar = () => {
    const limpio = correo.trim();
    if (!limpio) return;
    iniciarSesion({ nombre: limpio.split('@')[0], correo: limpio });
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text accessibilityRole="header" style={s.title}>Entra a PelotaYa</Text>
        {/* TODO: reemplazar por el campo de texto del equipo (SearchInput u otro) para usar el tema */}
        <TextInput
          value={correo}
          onChangeText={setCorreo}
          placeholder="correo@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ borderWidth: 1, borderRadius: 12, padding: 14, color: '#FFFFFF', borderColor: '#555' }}
        />
        <PrimaryButton label="Ingresar" onPress={entrar} />
      </ScrollView>
    </SafeAreaView>
  );
}
