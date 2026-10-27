import { StyleSheet } from 'react-native';
import { SportColors as c } from './colors';
import { SportSpacing as sp, SportRadius as r } from './spacing';
export const PichangaStyles = StyleSheet.create({
  content: { paddingTop: sp.xxl },
  field: { gap: sp.sm },
  label: { color: c.text, fontSize: 14, fontWeight: '600' },
  input: { color: c.text, backgroundColor: c.surface, borderColor: c.border, borderWidth: 1, borderRadius: r.md, minHeight: 48, paddingHorizontal: sp.lg, fontSize: 16 },
  error: { color: c.orange, fontSize: 14 },
  card: { backgroundColor: c.surface, borderRadius: r.lg, borderWidth: 1, borderColor: c.border, padding: sp.lg, gap: sp.sm },
});
