import { router } from 'expo-router';

import { ScreenPlaceholder } from '@/components/sport';

export default function PerfilScreen() {
  return (
    <ScreenPlaceholder
      title="Perfil"
      symbol="☻"
      message="Aquí verás y editarás tu perfil de pelotero."
      actionLabel="Ver catálogo de componentes"
      onAction={() => router.push('/catalogo')}
    />
  );
}
