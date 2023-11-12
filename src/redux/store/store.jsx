import { configureStore } from '@reduxjs/toolkit';
import filmsReducer from '../slice/filmsSlice';

const store = configureStore({
  reducer: {
    films: filmsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // getDefaultMiddleware Возвращает массив, содержащий список промежуточного программного обеспечения по умолчанию.
});
export default store;
