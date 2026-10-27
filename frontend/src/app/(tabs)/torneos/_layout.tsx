import { Stack } from 'expo-router';

export default function TorneosLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]" options={{ title: 'Torneo' }} />
    </Stack>
  );
}
