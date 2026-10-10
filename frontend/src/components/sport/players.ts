import type { ImageSourcePropType } from 'react-native';

export type Player = {
  name: string;
  position: string;
  team: string;
  fairPlay: number;
  avatarSource?: ImageSourcePropType;
};

export const POSITIONS = ['Todos', 'Arquero', 'Defensa', 'Mediocampista', 'Delantero'] as const;

/** Datos locales de ejemplo. */
export const PLAYERS: Player[] = [
  { name: "Carlos 'Chispa' Mendoza", position: 'Mediocampista', team: 'Deportivo Pachacámac Central', fairPlay: 4.9, avatarSource: require('@/assets/images/pelotaya/player.png') },
  { name: 'Renzo Quispe', position: 'Delantero', team: 'Los Galácticos de Manchay', fairPlay: 4.8 },
  { name: 'Luis Ramírez', position: 'Defensa', team: 'Los Amigos del Jueves', fairPlay: 4.6 },
  { name: 'Diego Torres', position: 'Arquero', team: 'Sport Juventud', fairPlay: 4.7 },
];

/** Quita tildes y pasa a minúsculas para comparar textos. */
export const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
