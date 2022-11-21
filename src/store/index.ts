import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '~/reducers';
import { statusMiddleware } from '~/apis/common/middleware';
// import logger from 'redux-logger';

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.TTPQ_NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(statusMiddleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
