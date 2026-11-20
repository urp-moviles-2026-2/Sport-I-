import { supabase } from '@/lib/supabase';
export type ActividadPrivada = { id: number; titulo: string; creado_en: string };
export async function getMisActividades(): Promise<ActividadPrivada[]> {
  const { data, error } = await supabase.from('actividades_privadas').select('id,titulo,creado_en').order('creado_en', { ascending: false });
  if (error) throw error;
  return data || [];
}
export async function crearActividad(titulo: string) {
  const { data, error } = await supabase.from('actividades_privadas').insert({ titulo }).select('id,titulo,creado_en').single();
  if (error) throw error;
  return data as ActividadPrivada;
}
