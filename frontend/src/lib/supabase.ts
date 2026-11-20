import 'react-native-url-polyfill/auto';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Dividimos valores grandes: SecureStore tiene un límite por entrada.
const CHUNK = 1500;
const storage = {
  async getItem(key: string) {
    if (Platform.OS === 'web') return AsyncStorage.getItem(key);
    const count = Number(await SecureStore.getItemAsync(`${key}.count`) || 0);
    if (!count) return null;
    const pieces = await Promise.all(Array.from({ length: count }, (_, i) => SecureStore.getItemAsync(`${key}.${i}`)));
    return pieces.some(x => x === null) ? null : pieces.join('');
  },
  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') return AsyncStorage.setItem(key, value);
    await this.removeItem(key);
    const chunks = value.match(new RegExp(`.{1,${CHUNK}}`, 'gs')) || [];
    await Promise.all(chunks.map((chunk, i) => SecureStore.setItemAsync(`${key}.${i}`, chunk)));
    await SecureStore.setItemAsync(`${key}.count`, String(chunks.length));
  },
  async removeItem(key: string) {
    if (Platform.OS === 'web') return AsyncStorage.removeItem(key);
    const count = Number(await SecureStore.getItemAsync(`${key}.count`) || 0);
    await Promise.all(Array.from({ length: count }, (_, i) => SecureStore.deleteItemAsync(`${key}.${i}`)));
    await SecureStore.deleteItemAsync(`${key}.count`);
  },
};
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) console.warn('LAB-06: configura frontend/.env según .env.example');
export const supabase = createClient(url || 'https://placeholder.supabase.co', key || 'placeholder', {
  auth: { storage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
});
