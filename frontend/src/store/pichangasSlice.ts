import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

export type EstadoPichanga = 'abierta' | 'completa' | 'cancelada';

export type Pichanga = {
  id: string;
  titulo: string;
  cancha: string;
  zona: string;
  hora: string;
  cupos: number;
  precio: number;
  estado: EstadoPichanga;
  creadoEn: string; // ISO string: el store solo guarda datos planos
};

type PichangasState = { items: Pichanga[] };
type NuevaPichanga = Pick<Pichanga, 'titulo' | 'cancha' | 'zona' | 'hora' | 'cupos' | 'precio'>;

// Los ids "7" y "8" coinciden con los que usa la pantalla de Inicio al navegar.
const initialState: PichangasState = {
  items: [
    { id: '7', titulo: '¡Falta 1 para la pichanga!', cancha: 'Cancha Los Cedros', zona: 'Pachacámac', hora: '8:30 PM', cupos: 1, precio: 14, estado: 'abierta', creadoEn: '2026-10-24T18:00:00.000Z' },
    { id: '8', titulo: 'Clásico de barrio: Los Galácticos', cancha: 'Losa Municipal', zona: 'Pachacámac', hora: '8:00 PM', cupos: 2, precio: 10, estado: 'abierta', creadoEn: '2026-10-24T19:00:00.000Z' },
    { id: '9', titulo: 'Pichanga de sábado', cancha: 'Losa Manchay', zona: 'Lurín', hora: '6:00 PM', cupos: 0, precio: 12, estado: 'completa', creadoEn: '2026-10-25T10:00:00.000Z' },
  ],
};

const pichangasSlice = createSlice({
  name: 'pichangas',
  initialState,
  reducers: {
    agregarPichanga: {
      reducer(state, action: PayloadAction<Pichanga>) {
        state.items.unshift(action.payload);
      },
      prepare(datos: NuevaPichanga) {
        return {
          payload: { ...datos, id: nanoid(), estado: 'abierta' as const, creadoEn: new Date().toISOString() },
        };
      },
    },
    cambiarEstado(state, action: PayloadAction<{ id: string; estado: EstadoPichanga }>) {
      const p = state.items.find((x) => x.id === action.payload.id);
      if (p) p.estado = action.payload.estado;
    },
    eliminarPichanga(state, action: PayloadAction<string>) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
    reemplazarTodos(state, action: PayloadAction<Pichanga[]>) {
      state.items = action.payload;
    },
  },
});

export const { agregarPichanga, cambiarEstado, eliminarPichanga, reemplazarTodos } = pichangasSlice.actions;

type RootLike = { pichangas: PichangasState };
export const selectPichangas = (state: RootLike) => state.pichangas.items;
export const selectPichangaPorId = (id: string) => (state: RootLike) => state.pichangas.items.find((p) => p.id === id);
export const selectAbiertas = (state: RootLike) => state.pichangas.items.filter((p) => p.estado === 'abierta').length;

export default pichangasSlice.reducer;
