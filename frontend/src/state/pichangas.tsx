import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export type Pichanga = { id: string; title: string; venue: string; date: string; time: string; capacity: number; price: number; joined: boolean; result?: string };
export type Draft = Omit<Pichanga, 'id' | 'joined' | 'result'>;
const KEY = 'pelotaya.pichangas.v1';
const Context = createContext<null | { matches: Pichanga[]; ready: boolean; error: string; create: (draft: Draft) => Promise<string>; update: (id: string, patch: Partial<Pick<Pichanga, 'joined' | 'result'>>) => Promise<void> }>(null);
export function PichangasProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<Pichanga[]>([]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const current = useRef<Pichanga[]>([]);
  const busy = useRef(false);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(KEY).then(value => {
      const data = value ? JSON.parse(value) : [];
      if (!Array.isArray(data) || !data.every(m => typeof m.id === 'string' && typeof m.title === 'string' && Number.isInteger(m.capacity))) throw new Error('Datos inválidos');
      if (active) { current.current = data; setMatches(data); setReady(true); }
    }).catch(() => { if (active) setError('No se pudieron cargar tus pichangas. Reinicia la aplicación para volver a intentar.'); });
    return () => { active = false; };
  }, []);
  async function save(next: Pichanga[]) {
    if (!ready || busy.current) throw new Error('Espera un momento y vuelve a intentar.');
    busy.current = true;
    try { await AsyncStorage.setItem(KEY, JSON.stringify(next)); current.current = next; setMatches(next); }
    finally { busy.current = false; }
  }
  async function create(draft: Draft) {
    const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await save([{ ...draft, id, joined: true }, ...current.current]);
    return id;
  }
  async function update(id: string, patch: Partial<Pick<Pichanga, 'joined' | 'result'>>) {
    await save(current.current.map(m => m.id === id ? { ...m, ...patch } : m));
  }
  return <Context.Provider value={{ matches, ready, error, create, update }}>{children}</Context.Provider>;
}
export function usePichangas() {
  const value = useContext(Context);
  if (!value) throw new Error('Falta PichangasProvider');
  return value;
}
