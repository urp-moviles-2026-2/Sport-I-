import AsyncStorage from '@react-native-async-storage/async-storage';
import { reemplazarTodos, type Pichanga } from './pichangasSlice';
import type { store as Store } from './index';

const CLAVE = 'pichangas/v1';

async function cargar(): Promise<Pichanga[] | null> {
  try {
    const json = await AsyncStorage.getItem(CLAVE);
    return json ? (JSON.parse(json) as Pichanga[]) : null;
  } catch (error) {
    console.warn('No se pudo leer el almacenamiento', error);
    return null;
  }
}

/** Hidrata el slice al arrancar y luego guarda en cada cambio de `items`. Llamar una sola vez. */
export async function iniciarPersistencia(store: typeof Store) {
  const guardado = await cargar();
  if (guardado) store.dispatch(reemplazarTodos(guardado));

  let ultimo = store.getState().pichangas.items;
  store.subscribe(() => {
    const actual = store.getState().pichangas.items;
    if (actual !== ultimo) {
      ultimo = actual;
      AsyncStorage.setItem(CLAVE, JSON.stringify(actual)).catch((e) => console.warn('No se pudo guardar', e));
    }
  });
}
