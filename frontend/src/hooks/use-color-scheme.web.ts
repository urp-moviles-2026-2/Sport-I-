import { useSyncExternalStore } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Conserva el mismo tema durante el render inicial y la hidratación web. */
export function useColorScheme() {
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const scheme = useRNColorScheme();
  return hydrated ? scheme : 'light';
}
