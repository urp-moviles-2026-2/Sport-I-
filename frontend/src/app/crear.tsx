import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '@/components/sport';
import { FormField } from '@/components/sport/FormField';
import { useAppDispatch } from '@/store/hooks';
import { agregarPichanga } from '@/store/pichangasSlice';
import { ScreenStyles as s } from '@/theme';
import { PichangaStyles as f } from '@/theme/pichanga-styles';
export default function CrearPichangaScreen() {
  const [values, setValues] = useState({ titulo: '', cancha: '', zona: '', hora: '', cupos: '', precio: '' });
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const fields = [['titulo', 'Título', 'Ej. Pichanga del barrio'], ['cancha', 'Cancha', 'Nombre de la cancha'], ['zona', 'Zona o distrito', 'Ej. Pachacámac'], ['hora', 'Hora (24 horas)', 'Ej. 20:30'], ['cupos', 'Cupos disponibles', 'De 1 a 40'], ['precio', 'Cuota por persona (S/)', 'Ej. 18.50']] as const;
  function guardar() {
    if (Object.values(values).some(v => !v.trim())) return setError('Completa todos los campos.');
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(values.hora)) return setError('La hora debe tener formato de 24 horas, por ejemplo 20:30.');
    const cupos = Number(values.cupos);
    const precio = Number(values.precio.replace(',', '.'));
    if (!Number.isInteger(cupos) || cupos < 1 || cupos > 40) return setError('Indica entre 1 y 40 cupos disponibles.');
    if (!Number.isFinite(precio) || precio < 0 || precio > 10000) return setError('La cuota debe estar entre S/ 0 y S/ 10000.');
    const action = agregarPichanga({ titulo: values.titulo.trim(), cancha: values.cancha.trim(), zona: values.zona.trim(), hora: values.hora, cupos, precio });
    dispatch(action);
    router.replace(`/pichanga/${action.payload.id}`);
  }
  return <ScrollView style={s.page} contentContainerStyle={[s.content, f.content]} keyboardShouldPersistTaps="handled">
    <Text style={s.title}>Nueva pichanga</Text>
    <Text style={s.subtitle}>Publica los datos de tu encuentro. Aparecerá en Inicio al guardarlo.</Text>
    {fields.map(([key, label, placeholder]) => <FormField key={key} label={label} placeholder={placeholder} value={values[key]} maxLength={key === 'titulo' || key === 'cancha' || key === 'zona' ? 100 : 10} keyboardType={key === 'cupos' ? 'number-pad' : key === 'precio' ? 'decimal-pad' : 'default'} onChangeText={value => { setError(''); setValues(v => ({ ...v, [key]: value })); }} />)}
    {!!error && <Text accessibilityRole="alert" style={f.error}>{error}</Text>}
    <PrimaryButton label="Guardar pichanga" onPress={guardar} />
    <PrimaryButton label="Volver a Inicio" variant="secondary" onPress={() => router.replace('/')} />
  </ScrollView>;
}
