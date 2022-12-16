import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '~/reducers';
import { statusMiddleware } from '~/apis/common/middleware';
import rootReducer from '~/reducers';
// import logger from 'redux-logger';

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.TTPQ_NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        // ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.showMessage'],
        // Ignore these paths in the state
        ignoredPaths: ['memberAuth.error.showMessage'],
      },
    }).concat(statusMiddleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
