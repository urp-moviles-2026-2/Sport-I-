
import { StyleSheet } from 'react-native';
import { SportColors as c } from './colors';
import { SportSpacing as sp, SportRadius as r } from './spacing';

export const PichangaStyles = StyleSheet.create({
  content: { paddingTop: sp.xxl },
  grow: { flex: 1 },
  pressed: { opacity: 0.8 },
  cardTop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: sp.sm,
  },
  cardTitle: {
    color: c.text,
    fontSize: 20,
    fontWeight: '700',
    flexGrow: 1,
    flexShrink: 1,
  },
  link: { color: c.primary, fontSize: 14, fontWeight: '600' },
  field: { gap: sp.sm },
  label: { color: c.text, fontSize: 14, fontWeight: '600' },
  input: {
    color: c.text,
    backgroundColor: c.surface,
    borderColor: c.border,
    borderWidth: 1,
    borderRadius: r.md,
    minHeight: 48,
    paddingHorizontal: sp.lg,
    fontSize: 16,
  },
  error: { color: c.orange, fontSize: 14 },
  inputError: { borderColor: c.danger, borderWidth: 1 },
  errorText: { color: c.danger, fontSize: 12, marginTop: sp.xs },

  // Laboratorio 05: opciones, calificación y casilla del formulario de contacto
  option: {
    padding: sp.md,
    marginVertical: sp.xs,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: r.md,
    backgroundColor: c.surface,
  },
  optionSelected: { borderColor: c.primary, backgroundColor: c.primarySoft },
  optionText: { color: c.text, fontSize: 15 },
  ratingRow: { flexDirection: 'row', gap: sp.md, marginVertical: sp.sm },
  ratingBox: {
    padding: sp.md,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: r.md,
    backgroundColor: c.surface,
  },
  ratingBoxSelected: { borderColor: c.primary, backgroundColor: c.primarySoft },
  checkWrap: { marginVertical: sp.md },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: sp.sm },
  checkText: { color: c.text, fontSize: 15 },
  card: {
    backgroundColor: c.surface,
    borderRadius: r.lg,
    borderWidth: 1,
    borderColor: c.border,
    padding: sp.lg,
    gap: sp.sm,
  },

  // Laboratorio 04: panel de estadísticas conectado a Redux
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: sp.sm,
    marginVertical: sp.sm,
  },
  statCard: {
    backgroundColor: c.surface,
    borderColor: c.border,
    borderWidth: 1,
    borderRadius: r.md,
    padding: sp.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexBasis: '45%',
    gap: sp.sm,
  },
  statNumber: {
    color: c.primary,
    fontSize: 26,
    fontWeight: '800',
  },
  statLabel: {
    color: c.text,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
