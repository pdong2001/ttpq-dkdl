import { APIError } from '~/apis/request/type';

export const InternalError: APIError = {
  Message: 'Internal error during request.',
  Code: 500,
};
export const UnhandledError: APIError = {
  Message: 'Cannot handle error data.',
  Code: 400,
};
