import { configureStore } from '@reduxjs/toolkit';
import typeSliceReducer from '../features/recursiveTypes/recursiveTypeSlice';

export const store = configureStore({
  reducer: {
    videogame: typeSliceReducer,
  },
});
