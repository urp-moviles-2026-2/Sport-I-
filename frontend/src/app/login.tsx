
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PrimaryButton } from '@/components/sport';
import { FormField } from '@/components/sport/FormField';
import { loginSchema, type LoginFormValues, type LoginFormData } from '@/schemas/loginSchema';
import { iniciarSesion, mensajeDeAuth } from '@/services/auth';
import { ScreenStyles as s } from '@/theme';

export default function LoginScreen() {
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormValues, unknown, LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      correo: '',
      clave: '',
    },
  });

  async function entrar(datos: LoginFormData) {
    setError('');

    try {
      await iniciarSesion(datos.correo, datos.clave);
      // El contexto del Integrante 3 actualizará la navegación.
    } catch (e) {
      setError(mensajeDeAuth(e));
    }
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView
        contentContainerStyle={s.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text accessibilityRole="header" style={s.title}>
          Entra a PelotaYa
        </Text>

        <Text style={s.subtitle}>
          Ingresa con tu correo y contraseña.
        </Text>

        <FormField<LoginFormValues>
          control={control}
          name="correo"
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
        />

        <FormField<LoginFormValues>
          control={control}
          name="clave"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          secureTextEntry
          autoCapitalize="none"
          autoComplete="password"
        />

        {error ? (
          <Text accessibilityRole="alert" style={{ color: '#D32F2F' }}>
            {error}
          </Text>
        ) : null}

        <PrimaryButton
          label={isSubmitting ? 'Ingresando...' : 'Ingresar'}
          onPress={handleSubmit(entrar)}
          disabled={isSubmitting}
        />

        <Link href="/registro" style={{ textAlign: 'center', marginTop: 16 }}>
          ¿No tienes cuenta? Regístrate
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
