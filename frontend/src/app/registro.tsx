
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PrimaryButton } from '@/components/sport';
import { FormField } from '@/components/sport/FormField';
import {
  registroSchema,
  type RegistroFormValues,
  type RegistroFormData,
} from '@/schemas/registroSchema';
import { registrar, mensajeDeAuth } from '@/services/auth';
import { ScreenStyles as s } from '@/theme';

export default function RegistroScreen() {
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegistroFormValues, unknown, RegistroFormData>({
    resolver: zodResolver(registroSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      nombre: '',
      correo: '',
      clave: '',
      confirmarClave: '',
    },
  });

  async function crearCuenta(datos: RegistroFormData) {
    setError('');
    setMensaje('');

    try {
      const resultado = await registrar({
        nombre: datos.nombre,
        correo: datos.correo,
        clave: datos.clave,
      });

      if (resultado.requiereConfirmacion) {
        setMensaje('Revisa tu correo para confirmar tu cuenta.');
      } else {
        setMensaje('Cuenta creada correctamente.');
      }
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
          Crea tu cuenta
        </Text>

        <Text style={s.subtitle}>
          Regístrate para comenzar a usar PelotaYa.
        </Text>

        <FormField<RegistroFormValues>
          control={control}
          name="nombre"
          label="Nombre"
          placeholder="Ingresa tu nombre"
          autoCapitalize="words"
        />

        <FormField<RegistroFormValues>
          control={control}
          name="correo"
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <FormField<RegistroFormValues>
          control={control}
          name="clave"
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          secureTextEntry
          autoCapitalize="none"
        />

        <FormField<RegistroFormValues>
          control={control}
          name="confirmarClave"
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          secureTextEntry
          autoCapitalize="none"
        />

        {error ? (
          <Text accessibilityRole="alert" style={{ color: '#D32F2F' }}>
            {error}
          </Text>
        ) : null}

        {mensaje ? (
          <Text accessibilityRole="status" style={{ color: '#237A40' }}>
            {mensaje}
          </Text>
        ) : null}

        <PrimaryButton
          label={isSubmitting ? 'Registrando...' : 'Crear cuenta'}
          onPress={handleSubmit(crearCuenta)}
          disabled={isSubmitting}
        />

        <Link href="/login" style={{ textAlign: 'center', marginTop: 16 }}>
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
