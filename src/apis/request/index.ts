import { makeHttp } from '~/apis/common/action';

export const httpGet = makeHttp('get');
export const httpPost = makeHttp('post');
export const httpPut = makeHttp('put');
export const httpDelete = makeHttp('delete');
export const httpPatch = makeHttp('patch');

const HTTP = {
  get: httpGet,
  post: httpPost,
  delete: httpDelete,
  put: httpPut,
  patch: httpPatch,
};

export default HTTP;
