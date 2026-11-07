import { ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PrimaryButton } from '@/components/sport';
import { useSesion } from '@/context/SesionContext';
import { FormField } from '@/components/sport/FormField';
import { loginSchema, type LoginFormValues, type LoginFormData } from '@/schemas/loginSchema';
import { ScreenStyles as s } from '@/theme';

// Login de prueba (sin backend): valida el correo, pero no verifica identidad.
export default function LoginScreen() {
  const { iniciarSesion } = useSesion();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<LoginFormValues, unknown, LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { correo: '' },
  });

  function entrar(datos: LoginFormData) {
    iniciarSesion({ nombre: datos.correo.split('@')[0], correo: datos.correo });
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={s.page}>
      <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
        <Text accessibilityRole="header" style={s.title}>Entra a PelotaYa</Text>
        <Text style={s.subtitle}>Sesión de demostración: no necesita contraseña ni verifica tu identidad.</Text>
        <FormField<LoginFormValues>
          control={control}
          name="correo"
          label="Correo electrónico"
          placeholder="correo@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <PrimaryButton label={isSubmitting ? 'Ingresando...' : 'Ingresar'} onPress={handleSubmit(entrar)} disabled={isSubmitting} />
      </ScrollView>
    </SafeAreaView>
  );
}
