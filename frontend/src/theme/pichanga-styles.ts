import { StyleSheet } from 'react-native';
import { SportColors as c } from './colors';
import { SportSpacing as sp, SportRadius as r } from './spacing';
export const PichangaStyles = StyleSheet.create({
  content: { paddingTop: sp.xxl },
  grow: { flex: 1 },
  pressed: { opacity: 0.8 },
  cardTop: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: sp.sm },
  cardTitle: { color: c.text, fontSize: 20, fontWeight: '700', flexGrow: 1, flexShrink: 1 },
  link: { color: c.primary, fontSize: 14, fontWeight: '600' },
  field: { gap: sp.sm },
  label: { color: c.text, fontSize: 14, fontWeight: '600' },
  input: { color: c.text, backgroundColor: c.surface, borderColor: c.border, borderWidth: 1, borderRadius: r.md, minHeight: 48, paddingHorizontal: sp.lg, fontSize: 16 },
  error: { color: c.orange, fontSize: 14 },
  card: { backgroundColor: c.surface, borderRadius: r.lg, borderWidth: 1, borderColor: c.border, padding: sp.lg, gap: sp.sm },
});
