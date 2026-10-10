import { StyleSheet } from 'react-native';

import { SportColors as c } from './colors';



/** Estilos compartidos: modificar el diseño de los componentes aquí. */

export const PrimaryButtonStyles = StyleSheet.create({
  button: { minHeight: 52, borderRadius: 999, paddingVertical: 14, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: c.primary, boxShadow: '0px 4px 22px rgba(190, 248, 41, 0.20)' },
  orange: { backgroundColor: c.orange, boxShadow: '0px 4px 22px rgba(245, 119, 0, 0.16)' },
  secondary: { backgroundColor: c.elevated },
  label: { color: c.primaryText, fontSize: 16, fontWeight: '700', textAlign: 'center' },
  secondaryLabel: { color: c.text },
  disabled: { backgroundColor: c.disabled, boxShadow: 'none' }, disabledLabel: { color: c.muted },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
});


export const PositionChipStyles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  chip: { minHeight: 44, borderRadius: 999, borderWidth: 1, borderColor: c.border, paddingHorizontal: 16, paddingVertical: 11, justifyContent: 'center', backgroundColor: c.elevated },
  active: { backgroundColor: c.primary, borderColor: c.primary }, label: { color: c.muted, fontWeight: '600', fontSize: 14 }, activeLabel: { color: c.primaryText },
});


export const SearchInputHitSlop = 4;

export const SearchInputStyles = StyleSheet.create({
  focused: { borderColor: c.primary },
  container: { minHeight: 52, borderRadius: 14, borderWidth: 1, borderColor: c.border, backgroundColor: c.elevated, flexDirection: 'row', alignItems: 'center', paddingLeft: 16 },
  input: { flex: 1, minWidth: 0, paddingVertical: 14, paddingHorizontal: 10, fontSize: 15, color: c.text }, icon: { color: c.muted, fontSize: 24 }, clear: { minWidth: 44, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
});


export const PlayerCardStyles = StyleSheet.create({
  pressed: { opacity: 0.8 },
  card: { backgroundColor: c.surface, borderRadius: 20, borderWidth: 1, borderColor: c.border, borderTopWidth: 3, borderTopColor: c.primary, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 52, height: 52, borderRadius: 12, backgroundColor: c.primarySoft, alignItems: 'center', justifyContent: 'center' }, initials: { color: c.primary, fontSize: 18, fontWeight: '700' },
  info: { flex: 1, gap: 7 }, name: { fontSize: 16, fontWeight: '700', color: c.text }, meta: { fontSize: 13, color: c.muted }, arrow: { color: c.muted, fontSize: 28 },
});


export const FairPlayBadgeStyles = StyleSheet.create({ badge: { alignSelf: 'flex-start', backgroundColor: c.primarySoft, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 }, text: { color: c.primary, fontSize: 12, fontWeight: '700' } });


export const EmptyStateStyles = StyleSheet.create({ container: { padding: 28, gap: 14, alignItems: 'center', borderRadius: 18, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border }, symbol: { fontSize: 36, color: c.primary }, title: { fontSize: 18, fontWeight: '700', color: c.text, textAlign: 'center' }, message: { fontSize: 14, lineHeight: 22, color: c.muted, textAlign: 'center' } });

