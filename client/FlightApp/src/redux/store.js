import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/authApi'
import fetchApi from './api/fetchApi';
import userReducer from './reducers/authSlice'
import ticketsApi from './api/ticketsApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [fetchApi.reducerPath]: fetchApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,ticketsApi.middleware, fetchApi.middleware),
})

setupListeners(store.dispatch)