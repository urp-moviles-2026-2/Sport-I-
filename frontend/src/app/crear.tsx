
import { useRef, type ComponentRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { PrimaryButton } from '@/components/sport';
import { FormField } from '@/components/sport/FormField';
import { useAppDispatch } from '@/store/hooks';
import { agregarPichanga } from '@/store/pichangasSlice';
import { ScreenStyles as s } from '@/theme';
import { PichangaStyles as f } from '@/theme/pichanga-styles';

import {
  pichangaSchema,
  type PichangaFormValues,
  type PichangaFormData,
} from '@/schemas/pichangaSchema';

export default function CrearPichangaScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const canchaRef = useRef<ComponentRef<typeof TextInput>>(null);
  const zonaRef = useRef<ComponentRef<typeof TextInput>>(null);
  const horaRef = useRef<ComponentRef<typeof TextInput>>(null);
  const cuposRef = useRef<ComponentRef<typeof TextInput>>(null);
  const precioRef = useRef<ComponentRef<typeof TextInput>>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PichangaFormValues, unknown, PichangaFormData>({
    resolver: zodResolver(pichangaSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      titulo: '',
      cancha: '',
      zona: '',
      hora: '',
      cupos: '',
      precio: '',
    },
  });

  function guardar(datos: PichangaFormData) {
    try {
      const action = agregarPichanga({
        titulo: datos.titulo,
        cancha: datos.cancha,
        zona: datos.zona,
        hora: datos.hora,
        cupos: datos.cupos,
        precio: datos.precio,
      });

      dispatch(action);
      reset();

      // La pichanga ya quedó en Redux y aparecerá al volver a Inicio.
      router.back();
    } catch {
      Alert.alert(
        'Error',
        'No se pudo guardar la pichanga. Inténtalo nuevamente.',
      );
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
        <Text style={s.title}>Nueva pichanga</Text>

        <Text style={s.subtitle}>
          Publica los datos de tu encuentro. Aparecerá en Inicio al guardarlo.
        </Text>

        <FormField<PichangaFormValues>
          control={control}
          name="titulo"
          label="Título"
          placeholder="Ej. Pichanga del barrio"
          maxLength={100}
          autoCapitalize="sentences"
          returnKeyType="next"
          onSubmitEditing={() => canchaRef.current?.focus()}
        />

        <FormField<PichangaFormValues>
          control={control}
          name="cancha"
          label="Cancha"
          placeholder="Nombre de la cancha"
          maxLength={100}
          autoCapitalize="words"
          returnKeyType="next"
          inputRef={canchaRef}
          onSubmitEditing={() => zonaRef.current?.focus()}
        />

        <FormField<PichangaFormValues>
          control={control}
          name="zona"
          label="Zona o distrito"
          placeholder="Ej. Pachacámac"
          maxLength={100}
          autoCapitalize="words"
          returnKeyType="next"
          inputRef={zonaRef}
          onSubmitEditing={() => horaRef.current?.focus()}
        />

        <FormField<PichangaFormValues>
          control={control}
          name="hora"
          label="Hora (24 horas)"
          placeholder="Ej. 20:30"
          maxLength={5}
          keyboardType="numbers-and-punctuation"
          returnKeyType="next"
          inputRef={horaRef}
          onSubmitEditing={() => cuposRef.current?.focus()}
        />

        <FormField<PichangaFormValues>
          control={control}
          name="cupos"
          label="Cupos disponibles"
          placeholder="De 1 a 40"
          maxLength={2}
          keyboardType="number-pad"
          returnKeyType="next"
          inputRef={cuposRef}
          onSubmitEditing={() => precioRef.current?.focus()}
        />

        <FormField<PichangaFormValues>
          control={control}
          name="precio"
          label="Cuota por persona (S/)"
          placeholder="Ej. 18.50"
          maxLength={10}
          keyboardType="decimal-pad"
          returnKeyType="send"
          inputRef={precioRef}
          onSubmitEditing={handleSubmit(guardar)}
        />

        <PrimaryButton
          label={isSubmitting ? 'Guardando...' : 'Guardar pichanga'}
          onPress={handleSubmit(guardar)}
          disabled={isSubmitting}
        />

        <PrimaryButton
          label="Volver a Inicio"
          variant="secondary"
          onPress={() => router.replace('/')}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
