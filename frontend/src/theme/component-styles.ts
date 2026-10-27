import { StyleSheet } from 'react-native';

import { SportColors as c } from './colors';
import { SportShadows } from './shadows';
import { SportBorders as b, SportLayout as l, SportPressed, SportRadius as r, SportSizes as z, SportSpacing as sp } from './spacing';
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

export const StatusBadgeStyles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', borderRadius: r.pill, paddingVertical: sp.xxs, paddingHorizontal: sp.md },
  primary: { backgroundColor: c.primarySoft },
  orange: { backgroundColor: c.orangeSoft },
  neutral: { backgroundColor: c.elevated },
  solid: { backgroundColor: c.primary },
  text: { fontSize: t.size.caption, fontWeight: t.weight.heavy, letterSpacing: t.letterSpacing.wide },
  primaryText: { color: c.primary },
  orangeText: { color: c.orange },
  neutralText: { color: c.muted },
  solidText: { color: c.primaryText },
});

export const SectionHeaderStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp.md },
  titleWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: sp.sm },
  dot: { width: z.statusDot, height: z.statusDot, borderRadius: r.pill, backgroundColor: c.orange },
  title: { flexShrink: 1, color: c.text, fontSize: t.size.heading, fontWeight: t.weight.bold },
  action: { color: c.primary, fontSize: t.size.meta, fontWeight: t.weight.bold },
  pressed: { opacity: SportPressed.opacity },
});

export const AvatarStackStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: z.avatarStack, height: z.avatarStack, borderRadius: r.pill, borderWidth: b.accent, borderColor: c.surface, alignItems: 'center', justifyContent: 'center', backgroundColor: c.elevated },
  overlap: { marginLeft: z.avatarOverlap },
  orange: { backgroundColor: c.orange },
  muted: { backgroundColor: c.disabled },
  primary: { backgroundColor: c.primary },
  initials: { color: c.text, fontSize: t.size.caption, fontWeight: t.weight.heavy },
  darkInitials: { color: c.primaryText },
});

export const MatchCardStyles = StyleSheet.create({
  pressed: { opacity: SportPressed.opacity },
  card: { backgroundColor: c.surface, borderRadius: r.xl, borderWidth: b.thin, borderColor: c.border, padding: sp.lg, gap: sp.lg },
  top: { flexDirection: 'row', alignItems: 'center', gap: sp.md },
  date: { width: z.dateBlock, paddingVertical: sp.xs, borderRadius: r.md, backgroundColor: c.elevated, alignItems: 'center' },
  day: { color: c.muted, fontSize: t.size.caption, fontWeight: t.weight.heavy },
  dayNumber: { color: c.text, fontSize: t.size.heading, fontWeight: t.weight.heavy },
  info: { flex: 1, gap: sp.xxs },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp.sm },
  title: { flexShrink: 1, color: c.text, fontSize: t.size.subtitle, fontWeight: t.weight.heavy },
  location: { color: c.muted, fontSize: t.size.small },
  players: { flexDirection: 'row', alignItems: 'center', gap: sp.md },
  ready: { color: c.text, fontSize: t.size.meta, fontWeight: t.weight.bold },
  paid: { marginLeft: 'auto', color: c.primary, fontSize: t.size.meta, fontWeight: t.weight.bold },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp.sm, borderRadius: r.md, backgroundColor: c.background, paddingVertical: sp.sm, paddingHorizontal: sp.md },
  payment: { flexShrink: 1, flexDirection: 'row', alignItems: 'center', gap: sp.sm },
  dot: { width: z.statusDot, height: z.statusDot, borderRadius: r.pill, backgroundColor: c.primary },
  footerText: { flexShrink: 1, color: c.muted, fontSize: t.size.caption, fontWeight: t.weight.bold, letterSpacing: t.letterSpacing.wide },
  missing: { color: c.primary, fontSize: t.size.caption, fontWeight: t.weight.heavy },
});

export const StatCardStyles = StyleSheet.create({
  pressed: { opacity: SportPressed.opacity },
  card: { flex: 1, backgroundColor: c.surface, borderRadius: r.lg, borderWidth: b.thin, borderColor: c.border, padding: sp.md, gap: sp.md },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrow: { color: c.muted, fontSize: t.size.caption, fontWeight: t.weight.heavy, letterSpacing: t.letterSpacing.wide },
  icon: { color: c.orange, fontSize: t.size.small },
  body: { flexDirection: 'row', alignItems: 'center', gap: sp.sm },
  avatar: { width: z.statAvatar, height: z.statAvatar, borderRadius: r.pill, backgroundColor: c.elevated, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: c.text, fontSize: t.size.subtitle },
  names: { flex: 1, gap: sp.xxs },
  name: { color: c.text, fontSize: t.size.body, fontWeight: t.weight.bold },
  subtitle: { color: c.muted, fontSize: t.size.small },
  nickname: { color: c.orange, fontSize: t.size.small },
  stat: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: r.md, backgroundColor: c.background, paddingVertical: sp.xs, paddingHorizontal: sp.md },
  statLabel: { color: c.muted, fontSize: t.size.caption, fontWeight: t.weight.heavy },
  statValue: { color: c.text, fontSize: t.size.display, fontWeight: t.weight.heavy },
  statHighlight: { color: c.primary },
});

export const FloatingActionButtonStyles = StyleSheet.create({
  fab: { width: z.fab, height: z.fab, borderRadius: r.pill, backgroundColor: c.primary, alignItems: 'center', justifyContent: 'center', boxShadow: SportShadows.primary },
  pressed: { opacity: SportPressed.opacity, transform: [{ scale: SportPressed.scale }] },
  symbol: { color: c.primaryText, fontSize: 24, fontWeight: t.weight.bold, lineHeight: 28 },
});

export const IconButtonStyles = StyleSheet.create({
  button: { borderRadius: r.pill, backgroundColor: c.elevated, alignItems: 'center', justifyContent: 'center' },
  md: { width: z.control, height: z.control },
  sm: { width: z.touchTarget, height: z.touchTarget },
  symbol: { color: c.text, fontSize: t.size.subtitle },
  dot: { position: 'absolute', top: sp.sm, right: sp.sm, width: z.notifDot, height: z.notifDot, borderRadius: r.pill, backgroundColor: c.orange, borderWidth: b.thin, borderColor: c.elevated },
  pressed: { opacity: SportPressed.opacity, transform: [{ scale: SportPressed.scale }] },
});

export const LocationPillStyles = StyleSheet.create({
  pill: { minHeight: z.touchTarget, flexDirection: 'row', alignItems: 'center', gap: sp.sm, paddingHorizontal: sp.lg, borderRadius: r.pill, backgroundColor: c.surface, borderWidth: b.thin, borderColor: c.border },
  pin: { color: c.primary, fontSize: t.size.label },
  label: { color: c.text, fontSize: t.size.small, fontWeight: t.weight.bold },
  chevron: { color: c.muted, fontSize: t.size.label },
  pressed: { opacity: SportPressed.opacity },
});

export const UrgentCallCardStyles = StyleSheet.create({
  card: { backgroundColor: c.surface, borderRadius: r.xl, borderWidth: b.thin, borderColor: c.border, padding: sp.lg, gap: sp.md },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp.sm },
  title: { color: c.text, fontSize: t.size.title, fontWeight: t.weight.heavy },
  bolt: { color: c.primary },
  venue: { color: c.text, fontSize: t.size.label, fontWeight: t.weight.bold },
  district: { color: c.muted, fontWeight: t.weight.semibold },
  need: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp.md, borderRadius: r.md, backgroundColor: c.background, paddingVertical: sp.sm, paddingHorizontal: sp.md },
  needText: { flex: 1, color: c.muted, fontSize: t.size.small },
  price: { color: c.primary, fontSize: t.size.meta, fontWeight: t.weight.heavy },
  actions: { flexDirection: 'row', alignItems: 'center', gap: sp.md },
  cta: { flex: 1 },
});

export const QuickActionTileStyles = StyleSheet.create({
  tile: { flex: 1, backgroundColor: c.surface, borderRadius: r.lg, borderWidth: b.thin, borderColor: c.border, paddingVertical: sp.md, paddingHorizontal: sp.xs, alignItems: 'center', gap: sp.sm },
  icon: { width: z.statAvatar, height: z.statAvatar, borderRadius: r.md, backgroundColor: c.elevated, alignItems: 'center', justifyContent: 'center' },
  iconOrange: { backgroundColor: c.orangeSoft },
  symbol: { color: c.primary, fontSize: t.size.subtitle },
  symbolOrange: { color: c.orange },
  label: { color: c.text, fontSize: t.size.caption, fontWeight: t.weight.semibold, textAlign: 'center' },
  pressed: { opacity: SportPressed.opacity, transform: [{ scale: SportPressed.scale }] },
});

export const FeaturedMatchCardStyles = StyleSheet.create({
  card: { backgroundColor: c.surface, borderRadius: r.xl, borderWidth: b.thin, borderColor: c.border, overflow: 'hidden' },
  photo: { height: z.photoHeight, backgroundColor: c.elevated, justifyContent: 'space-between', padding: sp.lg },
  photoImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', resizeMode: 'cover' },
  shade: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: c.shade },
  photoTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp.sm },
  tag: { color: c.primary, fontSize: t.size.caption, fontWeight: t.weight.heavy, letterSpacing: t.letterSpacing.wide },
  title: { color: c.text, fontSize: t.size.title, fontWeight: t.weight.heavy },
  body: { padding: sp.lg, gap: sp.md },
  venue: { color: c.muted, fontSize: t.size.meta },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: sp.md },
  priceLabel: { color: c.muted, fontSize: t.size.caption, fontWeight: t.weight.heavy, letterSpacing: t.letterSpacing.wide },
  priceLine: { flexDirection: 'row', alignItems: 'baseline', gap: sp.xxs },
  price: { color: c.text, fontSize: t.size.heading, fontWeight: t.weight.heavy },
  unit: { color: c.muted, fontSize: t.size.small },
  perk: { borderRadius: r.pill, backgroundColor: c.elevated, paddingVertical: sp.sm, paddingHorizontal: sp.md },
  perkText: { color: c.text, fontSize: t.size.small, fontWeight: t.weight.semibold },
});

export const BottomTabBarStyles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', flexDirection: 'column', alignItems: 'center' },
  inner: { width: '100%', maxWidth: l.contentMaxWidth },
  surface: { position: 'absolute', top: z.fab / 2, left: 0, right: 0, bottom: 0, backgroundColor: c.surface, borderTopWidth: b.thin, borderTopColor: c.border, borderTopLeftRadius: r.xl, borderTopRightRadius: r.xl },
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: sp.sm, paddingBottom: sp.xs },
  fabSlot: { position: 'absolute', top: 0, left: '50%', marginLeft: -z.fab / 2, width: z.fab, alignItems: 'center' },
  hidden: { display: 'none' },
});

export const BottomTabButtonStyles = StyleSheet.create({
  button: { flex: 1, minHeight: z.touchTarget, marginTop: z.fab + sp.xs, paddingVertical: sp.sm, alignItems: 'center', justifyContent: 'center', gap: sp.xxs },
  symbol: { color: c.muted, fontSize: t.size.icon },
  symbolActive: { color: c.primary },
  label: { color: c.muted, fontSize: t.size.small, fontWeight: t.weight.semibold },
  labelActive: { color: c.primary, fontWeight: t.weight.heavy },
  pressed: { opacity: SportPressed.opacity },
});
