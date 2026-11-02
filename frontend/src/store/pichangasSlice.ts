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

// Sin registros de ejemplo: la lista se llena al crear o recuperar datos locales.
const initialState: PichangasState = { items: [] };

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
