import { StyleSheet } from 'react-native';
import { SportColors as c } from './colors';

export const ComponentsDemoStyles = StyleSheet.create({
  page: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 520, alignSelf: 'center', padding: 20, paddingTop: 76, paddingBottom: 110, gap: 18 },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10 }, logo: { width: 40, height: 40 },
  location: { padding: 14, borderRadius: 30, backgroundColor: c.surface }, locationText: { color: c.text, fontSize: 12, fontWeight: '700' },
  avatar: { width: 38, height: 38, borderRadius: 19, marginLeft: 'auto' },
  hero: { backgroundColor: c.surface, borderRadius: 20, padding: 20, gap: 14, borderWidth: 1, borderColor: c.border },
  eyebrow: { color: c.primary, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  title: { color: c.text, fontSize: 27, fontWeight: '800' }, subtitle: { color: c.muted, fontSize: 14, lineHeight: 22 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, section: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 10 },
  heading: { color: c.text, fontSize: 20, fontWeight: '700', flexShrink: 1 }, count: { color: c.primary, fontSize: 11, fontWeight: '700' },
  panel: { backgroundColor: c.surface, padding: 20, borderRadius: 20, gap: 14 }, notice: { color: c.primary, fontSize: 14, lineHeight: 22 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  profile: { width: '100%', maxWidth: 440, padding: 24, borderRadius: 20, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, gap: 18 },
});
