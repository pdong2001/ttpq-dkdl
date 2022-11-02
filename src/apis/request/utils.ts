import { APIError } from './type';
export const InternalError: APIError = {
  Message: 'Internal error during request.',
  Code: 500,
};
export const UnhandledError: APIError = {
  Message: 'Cannot handle error data.',
  Code: 400,
};

export const getExceptionPayload = (ex: unknown): APIError => {
  if (typeof ex !== 'object' || !ex) {
    return InternalError;
  }

  const typedException = ex as APIError;
  const matchErrorStructure = ex.hasOwnProperty('message') && ex.hasOwnProperty('code')

  if (matchErrorStructure) {
    return typedException;
  }
  return InternalError;
};
