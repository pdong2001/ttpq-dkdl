import { APIError } from './type';
import { InternalError } from '~/apis/request/constant';

export const getExceptionPayload = (ex: unknown): APIError => {
  if (typeof ex !== 'object' || !ex) {
    return InternalError;
  }

  const typedException = ex as APIError;
  const matchErrorStructure = ex.hasOwnProperty('message') && ex.hasOwnProperty('code');

  if (matchErrorStructure) {
    return typedException;
  }
  return InternalError;
};
