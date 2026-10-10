import { StyleSheet } from 'react-native';

import { SportColors as c } from './colors';
import { SportBorders as b, SportLayout as l, SportRadius as r, SportSizes as z, SportSpacing as sp } from './spacing';
import { SportTypography as t } from './typography';

/** Estilos de las pantallas (Inicio y Catálogo). Todos los valores salen del tema. */

export const ScreenStyles = StyleSheet.create({
  page: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: l.contentMaxWidth, alignSelf: 'center', padding: sp.xl, paddingTop: l.screenTop, paddingBottom: l.screenBottom, gap: sp.xl },
  header: { flexDirection: 'row', alignItems: 'center', gap: sp.md },
  logo: { width: z.logo, height: z.logo },
  location: { padding: sp.lg, borderRadius: r.pill, backgroundColor: c.surface },
  locationText: { color: c.text, fontSize: t.size.small, fontWeight: t.weight.bold },
  headerAvatar: { width: z.avatarSmall, height: z.avatarSmall, borderRadius: r.pill, marginLeft: 'auto' },
  hero: { backgroundColor: c.surface, borderRadius: r.xl, padding: sp.xl, gap: sp.lg, borderWidth: b.thin, borderColor: c.border },
  eyebrow: { color: c.primary, fontSize: t.size.caption, fontWeight: t.weight.heavy, letterSpacing: t.letterSpacing.wide },
  title: { color: c.text, fontSize: t.size.display, fontWeight: t.weight.heavy },
  subtitle: { color: c.muted, fontSize: t.size.body, lineHeight: t.lineHeight.body },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: sp.sm },
  section: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: sp.md },
  heading: { color: c.text, fontSize: t.size.heading, fontWeight: t.weight.bold, flexShrink: 1 },
  count: { color: c.primary, fontSize: t.size.caption, fontWeight: t.weight.bold },
  panel: { backgroundColor: c.surface, padding: sp.xl, borderRadius: r.xl, gap: sp.lg },
  notice: { color: c.primary, fontSize: t.size.body, lineHeight: t.lineHeight.body },
  backdrop: { flex: 1, backgroundColor: c.overlay, justifyContent: 'center', alignItems: 'center', padding: sp.xxl },
  profile: { width: '100%', maxWidth: l.modalMaxWidth, padding: sp.xxl, borderRadius: r.xl, backgroundColor: c.surface, borderWidth: b.thin, borderColor: c.border, gap: sp.xl },
  /** Catálogo */
  demoBlock: { backgroundColor: c.surface, borderRadius: r.xl, borderWidth: b.thin, borderColor: c.border, padding: sp.xl, gap: sp.lg },
  demoName: { color: c.text, fontSize: t.size.subtitle, fontWeight: t.weight.bold },
  demoNote: { color: c.muted, fontSize: t.size.meta, lineHeight: t.lineHeight.body },
  demoResult: { color: c.primary, fontSize: t.size.body, fontWeight: t.weight.semibold },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: sp.sm },
  fullWidth: { alignSelf: 'stretch' },
});
