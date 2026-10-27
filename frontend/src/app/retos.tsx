import { Redirect } from 'expo-router';

/** Compatibilidad con la maqueta antigua: usa la lista de Retos del LAB-03. */
export default function RetosLegacyScreen() {
  return <Redirect href="/(tabs)/retos" />;
}
