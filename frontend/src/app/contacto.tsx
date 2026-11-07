
import { useRef, type ComponentRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { PrimaryButton } from '@/components/sport';
import { FormField } from '@/components/sport/FormField';
import {
  contactoSchema,
  type ContactoFormValues,
  type ContactoFormData,
} from '@/schemas/contactoSchema';
import { ScreenStyles as s } from '@/theme';
import { PichangaStyles as f } from '@/theme/pichanga-styles';

const opciones = [
  { label: 'Consulta', value: 'consulta' },
  { label: 'Sugerencia', value: 'sugerencia' },
  { label: 'Reclamo', value: 'reclamo' },
] as const;

export default function ContactoScreen() {
  const router = useRouter();
  const correoRef = useRef<ComponentRef<typeof TextInput>>(null);
  const celularRef = useRef<ComponentRef<typeof TextInput>>(null);
  const mensajeRef = useRef<ComponentRef<typeof TextInput>>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactoFormValues, unknown, ContactoFormData>({
    resolver: zodResolver(contactoSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      nombre: '',
      correo: '',
      celular: '',
      tipo: 'consulta',
      calificacion: 5,
      mensaje: '',
      aceptaTerminos: false,
    },
  });

  async function enviar(datos: ContactoFormData) {
    try {
      // En la S11 esto será una llamada a la API con Axios. Por ahora simulamos el envío.
      await new Promise((resolver) => setTimeout(resolver, 800));
      console.log('Formulario de contacto:', datos);

      Alert.alert(
        '¡Mensaje enviado!',
        'Gracias por compartir tus comentarios con PelotaYA.',
        [
          {
            text: 'Aceptar',
            onPress: () => {
              reset();
              router.back();
            },
          },
        ],
      );
    } catch {
      Alert.alert('Error', 'No se pudo enviar el mensaje.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={s.page}
        contentContainerStyle={[s.content, f.content]}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={s.title}>Contacto y comentarios</Text>

        <Text style={s.subtitle}>
          Cuéntanos tu experiencia con PelotaYA. ¡Queremos escucharte!
        </Text>

        <FormField<ContactoFormValues>
          control={control}
          name="nombre"
          label="Nombre completo"
          placeholder="Ingresa tu nombre"
          maxLength={80}
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => correoRef.current?.focus()}
        />

        <FormField<ContactoFormValues>
          control={control}
          name="correo"
          label="Correo electrónico"
          placeholder="ejemplo@correo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          maxLength={120}
          returnKeyType="next"
          inputRef={correoRef}
          onSubmitEditing={() => celularRef.current?.focus()}
        />

        <FormField<ContactoFormValues>
          control={control}
          name="celular"
          label="Número de celular"
          placeholder="987654321"
          keyboardType="number-pad"
          maxLength={9}
          returnKeyType="next"
          inputRef={celularRef}
          onSubmitEditing={() => mensajeRef.current?.focus()}
        />

        <Text style={f.label}>Tipo de mensaje</Text>

        <Controller
          control={control}
          name="tipo"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View>
              {opciones.map((opcion) => (
                <Pressable
                  key={opcion.value}
                  onPress={() => onChange(opcion.value)}
                  style={{
                    padding: 12,
                    marginVertical: 4,
                    borderWidth: 1,
                    borderColor: value === opcion.value ? '#2563EB' : '#999',
                    borderRadius: 8,
                  }}
                >
                  <Text>
                    {value === opcion.value ? '● ' : '○ '}
                    {opcion.label}
                  </Text>
                </Pressable>
              ))}

              {error?.message ? (
                <Text accessibilityRole="alert" style={f.error}>
                  {error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <Text style={f.label}>Calificación (1 a 5)</Text>

        <Controller
          control={control}
          name="calificacion"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                  marginVertical: 10,
                }}
              >
                {[1, 2, 3, 4, 5].map((numero) => (
                  <Pressable
                    key={numero}
                    onPress={() => onChange(numero)}
                    style={{
                      padding: 12,
                      borderWidth: 1,
                      borderRadius: 8,
                      borderColor: value === numero ? '#2563EB' : '#999',
                    }}
                  >
                    <Text>{numero}</Text>
                  </Pressable>
                ))}
              </View>

              {error?.message ? (
                <Text accessibilityRole="alert" style={f.error}>
                  {error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <FormField<ContactoFormValues>
          control={control}
          name="mensaje"
          label="Mensaje"
          placeholder="Escribe tus comentarios..."
          multiline
          numberOfLines={4}
          maxLength={500}
          textAlignVertical="top"
          returnKeyType="send"
          submitBehavior="blurAndSubmit"
          inputRef={mensajeRef}
          onSubmitEditing={handleSubmit(enviar)}
        />

        <Controller
          control={control}
          name="aceptaTerminos"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View style={{ marginVertical: 12 }}>
              <Pressable
                onPress={() => onChange(!value)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Text>{value ? '☑' : '☐'}</Text>
                <Text>Acepto los términos y condiciones.</Text>
              </Pressable>

              {error?.message ? (
                <Text accessibilityRole="alert" style={f.error}>
                  {error.message}
                </Text>
              ) : null}
            </View>
          )}
        />

        <PrimaryButton
          label={isSubmitting ? 'Enviando...' : 'Enviar comentario'}
          onPress={handleSubmit(enviar)}
          disabled={isSubmitting}
        />

        <PrimaryButton
          label="Volver"
          variant="secondary"
          onPress={() => router.back()}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
