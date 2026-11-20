import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import * as auth from '@/services/auth';
import { limpiarDatosLocales } from '@/store/persistencia';
import { store } from '@/store';
import { reemplazarTodos } from '@/store/pichangasSlice';
type Estado = 'cargando' | 'sinSesion' | 'conSesion';
type SesionValue = {
  usuario: auth.Usuario | null;
  estado: Estado;
  estaLogueado: boolean;
  iniciarSesion: typeof auth.iniciarSesion;
  registrar: typeof auth.registrar;
  cerrarSesion: () => Promise<void>;
};
const SesionContext = createContext<SesionValue | null>(null);
export function SesionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<auth.Usuario | null>(null);
  const [estado, setEstado] = useState<Estado>('cargando');
  useEffect(() => auth.escucharSesion(u => { setUsuario(u); setEstado(u ? 'conSesion' : 'sinSesion'); }), []);
  const value = useMemo<SesionValue>(() => ({
    usuario, estado, estaLogueado: estado === 'conSesion',
    iniciarSesion: auth.iniciarSesion, registrar: auth.registrar,
    cerrarSesion: async () => {
      // Primero borrar el store/persistencia, antes de emitir el evento de logout.
      store.dispatch(reemplazarTodos([]));
      try { await limpiarDatosLocales(); }
      finally { await auth.cerrarSesion(); } // el logout siempre se ejecuta
    },
  }), [usuario, estado]);
  return <SesionContext.Provider value={value}>{children}</SesionContext.Provider>;
}
export function useSesion() {
  const ctx = useContext(SesionContext);
  if (!ctx) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  return ctx;
}
