import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

type Usuario = { nombre: string; correo: string };
type SesionValue = {
  usuario: Usuario | null;
  estaLogueado: boolean;
  iniciarSesion: (datos: Usuario) => void;
  cerrarSesion: () => void;
};

const SesionContext = createContext<SesionValue | null>(null);

export function SesionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const value = useMemo<SesionValue>(
    () => ({
      usuario,
      estaLogueado: usuario !== null,
      iniciarSesion: (datos) => setUsuario(datos),
      cerrarSesion: () => setUsuario(null),
    }),
    [usuario],
  );

  return <SesionContext.Provider value={value}>{children}</SesionContext.Provider>;
}

export function useSesion() {
  const ctx = useContext(SesionContext);
  if (!ctx) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  return ctx;
}
