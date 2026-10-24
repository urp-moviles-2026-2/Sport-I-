/** Espaciados, radios, tamaños y bordes de PelotaYa. Úsalos en lugar de números sueltos. */

export const SportSpacing = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 28,
} as const;

export const SportRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const SportBorders = {
  thin: 1,
  accent: 3,
} as const;

/** Tamaños de controles, íconos, imágenes y área táctil. */
export const SportSizes = {
  touchTarget: 44,
  control: 52,
  hitSlop: 4,
  icon: 24,
  logo: 40,
  avatarSmall: 38,
  avatarMedium: 52,
  toggleTrackWidth: 52,
  toggleTrackHeight: 32,
  toggleThumb: 24,
  avatarStack: 34,
  avatarOverlap: -10,
  dateBlock: 52,
  statusDot: 8,
  fab: 60,
  statAvatar: 40,
  notifDot: 10,
  photoHeight: 180,
} as const;

/** Anchos máximos y márgenes de las pantallas. */
export const SportLayout = {
  contentMaxWidth: 520,
  modalMaxWidth: 440,
  screenTop: 76,
  screenBottom: 140,
} as const;

/** Respuesta visual al presionar un componente. */
export const SportPressed = {
  opacity: 0.8,
  scale: 0.98,
} as const;
