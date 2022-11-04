import { Middleware } from 'redux';

export const statusMiddleware: Middleware = (_) => (next) => (action) => {
  console.log('action', action);
  next(action);
};
