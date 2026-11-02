import { configureStore } from '@reduxjs/toolkit';
import pichangasReducer from './pichangasSlice';

export const store = configureStore({
  reducer: {
    pichangas: pichangasReducer,
    // jugadores, retos, torneos: slices vacíos para la S10 y la S11
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
