import { configureStore } from '@reduxjs/toolkit';
import pichangasReducer from './pichangasSlice';

export const store = configureStore({
  reducer: {
    pichangas: pichangasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Muestra el estado para la evidencia del laboratorio en desarrollo.
if (__DEV__) {
  store.subscribe(() => {
    console.log(
      'Estado del store:',
      JSON.stringify(store.getState(), null, 2),
    );
  });
}
