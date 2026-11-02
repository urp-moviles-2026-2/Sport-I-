import { Pressable, Text } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import { PrimaryButton, ScreenPlaceholder } from '@/components/sport';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cambiarEstado, eliminarPichanga, selectPichangaPorId } from '@/store/pichangasSlice';

export default function PichangaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pichanga = useAppSelector(selectPichangaPorId(id));
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!pichanga) {
    return (
      <ScreenPlaceholder title="Pichanga no encontrada" symbol="∅" message="Esta pichanga ya no existe.">
        <PrimaryButton label="Volver" onPress={() => router.back()} />
      </ScreenPlaceholder>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: pichanga.titulo,
          headerRight: () => (
            <Pressable onPress={() => console.log('compartir pichanga', id)} hitSlop={10}>
              <Text style={{ fontSize: 22 }}>↗</Text>
            </Pressable>
          ),
        }}
      />
      <ScreenPlaceholder
        title={pichanga.titulo}
        symbol="⚡"
        message={`${pichanga.cancha} · ${pichanga.zona} · ${pichanga.hora} · S/ ${pichanga.precio} c/u · ${pichanga.cupos} cupos · Estado: ${pichanga.estado}`}
      >
        <PrimaryButton
          label="Marcar como completa"
          onPress={() => dispatch(cambiarEstado({ id: pichanga.id, estado: 'completa' }))}
        />
        <PrimaryButton label="Buscar cancha" onPress={() => router.push('/buscar-cancha')} />
        <PrimaryButton
          label="Eliminar"
          onPress={() => {
            dispatch(eliminarPichanga(pichanga.id));
            router.back();
          }}
        />
      </ScreenPlaceholder>
    </>
  );
}
