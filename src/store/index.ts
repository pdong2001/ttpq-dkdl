import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '~/reducers';

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.TTPQ_NODE_ENV === 'development',
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
