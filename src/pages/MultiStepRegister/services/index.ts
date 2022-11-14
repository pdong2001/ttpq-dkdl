import { createAsyncRequest } from '~/apis/common/action';
import API from '~/apis/constants';

export const register = createAsyncRequest('register', {
  method: 'post',
  url: API.REGISTER,
});
/* Khi HD tạo 1 service (action) cần tạo thêm 1 handler (reducer) ở trong slice */
export const searchMember = createAsyncRequest('searchMember', {
  method: 'post',
  url: API.SEARCH_MEMBER,
});
