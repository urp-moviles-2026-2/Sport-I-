import type { FeaturedMatchCardProps } from './FeaturedMatchCard';
import type { MatchCardProps } from './MatchCard';
import type { QuickActionTileProps } from './QuickActionTile';
import type { StatCardProps } from './StatCard';
import type { UrgentCallCardProps } from './UrgentCallCard';

type Match = Omit<MatchCardProps, 'onPress' | 'style'> & { id: string };
type Highlight = Omit<StatCardProps, 'onPress' | 'style'> & { id: string };

/** Datos locales de ejemplo para la pantalla de Inicio. */
export const MATCHES: Match[] = [
  {
    id: 'm1', weekday: 'MIE', day: '17', title: 'Mañana • 7:00 PM', location: 'Cancha San Fernando (Pachacámac)', format: 'F6 AMIGO',
    players: ['RQ', 'JT', 'MC'], extraPlayers: 9, ready: 12, total: 14, paid: true, paymentNote: 'YAPE / PLIN 50% CONFIRMADO', missing: 'FALTAN 2 CHALECOS',
  },
];

export const RANKING: Highlight[] = [
  { id: 'r1', eyebrow: 'PICHANGUERO TOP', icon: '◉', avatar: '🏅', name: 'Renzo Quispe', nickname: 'El Tanque', statLabel: 'GOLES', statValue: '18', highlight: true },
  { id: 'r2', eyebrow: 'EQUIPO INVICTO', icon: '⛉', avatar: '⚽', name: 'Dep. Paul Poblet', subtitle: 'Pachacámac', statLabel: 'RACHA', statValue: '5W - 0L' },
];

export const URGENT_CALL: Omit<UrgentCallCardProps, 'onJoin' | 'onShare' | 'style'> = {
  eyebrow: '¡PASA LA VOZ URGENTE!', format: 'F7 • 8:30 PM HOY', title: '¡FALTA 1 PARA LA PICHANGA!', venue: 'Cancha Los Cedros', district: 'Pachacámac',
  need: 'Urge mediocampista con pase largo', price: 'S/ 14 c/u', ctaLabel: '¡Voy al toque!',
};

export const QUICK_ACTIONS: (Omit<QuickActionTileProps, 'onPress' | 'style'> & { id: string })[] = [
  { id: 'cancha', label: 'Buscar Cancha', symbol: '⌕' },
  { id: 'reto', label: 'Reto Relámpago', symbol: '⚔', tone: 'orange' },
  { id: 'refuerzos', label: 'Bolsa de Refuerzos', symbol: '☺' },
  { id: 'resultado', label: 'Subir Resultado', symbol: '▤' },
];

/** Para la foto de fondo agrega `imageSource: require('@/assets/images/pelotaya/cancha.png')`. */
export const FEATURED: Omit<FeaturedMatchCardProps, 'onJoin' | 'style'> = {
  status: 'HOY EN VIVO • 8:00 PM', spots: '2 CUPOS LIBRES', tag: 'CLÁSICO DE BARRIO', title: 'LOS GALÁCTICOS DE MANCHAY VS LOS CRACKS DE LURÍN',
  venue: 'Complejo Deportivo El Golazo, Pachacámac', priceLabel: 'CUOTA DE CANCHA', price: 'S/ 18', perk: 'Chalecos + Gatorade', ctaLabel: 'Unirse al equipo',
};
