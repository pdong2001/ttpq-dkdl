import { createAsyncAction } from '~/apis/common/action';

export const login = createAsyncAction('login', {
  method: 'post',
  url: '/api/v1/Auth/login',
});

export const register = createAsyncAction('register', {
  method: 'get',
  url: '/register',
});
