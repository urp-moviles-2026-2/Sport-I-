import { StyleSheet } from 'react-native';

import { SportColors as c } from './colors';
import { SportShadows } from './shadows';
import { SportBorders as b, SportPressed, SportRadius as r, SportSizes as z, SportSpacing as sp } from './spacing';
import { SportTypography as t } from './typography';

/** Estilos de los componentes. Todos los valores salen del tema: para cambiar el diseño, edita los tokens. */

export const PrimaryButtonStyles = StyleSheet.create({
  button: { minHeight: z.control, borderRadius: r.pill, paddingVertical: sp.lg, paddingHorizontal: sp.xl, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: c.primary, boxShadow: SportShadows.primary },
  orange: { backgroundColor: c.orange, boxShadow: SportShadows.orange },
  secondary: { backgroundColor: c.elevated },
  label: { color: c.primaryText, fontSize: t.size.label, fontWeight: t.weight.bold, textAlign: 'center' },
  secondaryLabel: { color: c.text },
  disabled: { backgroundColor: c.disabled, boxShadow: SportShadows.none },
  disabledLabel: { color: c.muted },
  pressed: { opacity: SportPressed.opacity, transform: [{ scale: SportPressed.scale }] },
});

export const PositionChipStyles = StyleSheet.create({
  pressed: { opacity: SportPressed.opacity },
  chip: { minHeight: z.touchTarget, borderRadius: r.pill, borderWidth: b.thin, borderColor: c.border, paddingHorizontal: sp.lg, paddingVertical: sp.md, justifyContent: 'center', backgroundColor: c.elevated },
  active: { backgroundColor: c.primary, borderColor: c.primary },
  label: { color: c.muted, fontWeight: t.weight.semibold, fontSize: t.size.body },
  activeLabel: { color: c.primaryText },
});

export const SearchInputStyles = StyleSheet.create({
  focused: { borderColor: c.primary },
  container: { minHeight: z.control, borderRadius: r.lg, borderWidth: b.thin, borderColor: c.border, backgroundColor: c.elevated, flexDirection: 'row', alignItems: 'center', paddingLeft: sp.lg },
  input: { flex: 1, minWidth: 0, paddingVertical: sp.lg, paddingHorizontal: sp.md, fontSize: t.size.input, color: c.text },
  icon: { color: c.muted, fontSize: t.size.icon },
  clear: { minWidth: z.touchTarget, minHeight: z.control, alignItems: 'center', justifyContent: 'center' },
});

export const PlayerCardStyles = StyleSheet.create({
  pressed: { opacity: SportPressed.opacity },
  card: { backgroundColor: c.surface, borderRadius: r.xl, borderWidth: b.thin, borderColor: c.border, borderTopWidth: b.accent, borderTopColor: c.primary, padding: sp.lg, flexDirection: 'row', alignItems: 'center', gap: sp.lg },
  avatar: { width: z.avatarMedium, height: z.avatarMedium, borderRadius: r.md, backgroundColor: c.primarySoft, alignItems: 'center', justifyContent: 'center' },
  initials: { color: c.primary, fontSize: t.size.subtitle, fontWeight: t.weight.bold },
  info: { flex: 1, gap: sp.sm },
  name: { fontSize: t.size.label, fontWeight: t.weight.bold, color: c.text },
  meta: { fontSize: t.size.meta, color: c.muted },
  arrow: { color: c.muted, fontSize: t.size.arrow },
});

export const FairPlayBadgeStyles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', backgroundColor: c.primarySoft, borderRadius: r.sm, paddingVertical: sp.xs, paddingHorizontal: sp.md },
  text: { color: c.primary, fontSize: t.size.small, fontWeight: t.weight.bold },
});

export const EmptyStateStyles = StyleSheet.create({
  container: { padding: sp.xxxl, gap: sp.lg, alignItems: 'center', borderRadius: r.xl, backgroundColor: c.surface, borderWidth: b.thin, borderColor: c.border },
  symbol: { fontSize: t.size.symbol, color: c.primary },
  title: { fontSize: t.size.subtitle, fontWeight: t.weight.bold, color: c.text, textAlign: 'center' },
  message: { fontSize: t.size.body, lineHeight: t.lineHeight.body, color: c.muted, textAlign: 'center' },
});
export const AvailabilityToggleStyles = StyleSheet.create({
  row: { minHeight: z.touchTarget, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp.lg },
  label: { flex: 1, color: c.text, fontSize: t.size.label, fontWeight: t.weight.semibold },
  track: { width: z.toggleTrackWidth, height: z.toggleTrackHeight, borderRadius: r.pill, borderWidth: b.thin, borderColor: c.border, backgroundColor: c.elevated, paddingHorizontal: sp.xxs, justifyContent: 'center', alignItems: 'flex-start' },
  trackOn: { backgroundColor: c.primary, borderColor: c.primary, alignItems: 'flex-end' },
  thumb: { width: z.toggleThumb, height: z.toggleThumb, borderRadius: r.pill, backgroundColor: c.muted },
  thumbOn: { backgroundColor: c.primaryText },
  disabled: { opacity: SportPressed.opacity },
  pressed: { opacity: SportPressed.opacity },
});