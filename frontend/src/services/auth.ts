import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
export type Usuario = { id: string; correo: string; nombre: string };
const aUsuario = (u: User | null | undefined): Usuario | null => u ? {
  id: u.id, correo: u.email || '', nombre: u.user_metadata?.nombre || u.email?.split('@')[0] || 'Jugador',
} : null;
export async function registrar({ nombre, correo, clave }: { nombre: string; correo: string; clave: string }) {
  const { data, error } = await supabase.auth.signUp({ email: correo, password: clave, options: { data: { nombre } } });
  if (error) throw error;
  return { usuario: aUsuario(data.user), requiereConfirmacion: !data.session };
}
export async function iniciarSesion(correo: string, clave: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email: correo, password: clave });
  if (error) throw error;
  return aUsuario(data.user);
}
export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
export function escucharSesion(callback: (usuario: Usuario | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(aUsuario(session?.user)));
  // getSession garantiza que el estado inicial termina aunque no llegue un evento.
  supabase.auth.getSession().then(({ data: session, error }) => {
    if (error) callback(null);
    else callback(aUsuario(session.session?.user));
  }).catch(() => callback(null));
  return () => data.subscription.unsubscribe();
}
export async function obtenerToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}
export function mensajeDeAuth(error: unknown) {
  const e = error as { code?: string; name?: string; message?: string } | null;
  if (['invalid_credentials', 'email_not_confirmed'].includes(e?.code || '')) return e?.code === 'email_not_confirmed' ? 'Revisa tu correo para confirmar la cuenta' : 'Correo o contraseña incorrectos';
  if (e?.code === 'user_already_exists' || e?.code === 'email_exists') return 'No se pudo crear la cuenta. Si ya tienes una, inicia sesión';
  if (e?.code === 'weak_password') return 'La contraseña es muy débil';
  if (e?.name === 'AuthRetryableFetchError' || /fetch|network|connection/i.test(e?.message || '')) return 'Sin conexión. Revisa tu internet e inténtalo de nuevo';
  return 'No pudimos completar la operación. Inténtalo de nuevo';
}
