import AsyncStorage from '@react-native-async-storage/async-storage';
import { reemplazarTodos, type Pichanga } from './pichangasSlice';
import type { store as Store } from './index';
const CLAVE = 'pichangas/v1';
export function esPichanga(value: unknown): value is Pichanga {
  if (!value || typeof value !== 'object') return false;
  const p = value as Record<string, unknown>;
  return ['id', 'titulo', 'cancha', 'zona', 'hora', 'creadoEn'].every(k => typeof p[k] === 'string') &&
    Number.isInteger(p.cupos) && Number(p.cupos) >= 0 && typeof p.precio === 'number' && Number.isFinite(p.precio) && p.precio >= 0 &&
    ['abierta', 'completa', 'cancelada'].includes(String(p.estado));
}
/** Espera la lectura antes de habilitar la app. Las escrituras se realizan en orden. */
export async function iniciarPersistencia(store: typeof Store, onError: (message: string) => void) {
  const json = await AsyncStorage.getItem(CLAVE);
  if (json !== null) {
    const datos: unknown = JSON.parse(json);
    if (!Array.isArray(datos) || !datos.every(esPichanga)) throw new Error('Datos locales no válidos');
    store.dispatch(reemplazarTodos(datos));
  }
  let ultimo = store.getState().pichangas.items;
  let cola = Promise.resolve();
  return store.subscribe(() => {
    const actual = store.getState().pichangas.items;
    if (actual === ultimo) return;
    ultimo = actual;
    cola = cola.then(() => AsyncStorage.setItem(CLAVE, JSON.stringify(actual))).then(() => onError('')).catch(() => onError('No se pudo guardar en este dispositivo. Los cambios podrían perderse al cerrar la app.'));
  });
}
