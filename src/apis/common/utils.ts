import { MessageServiceProps } from './../../providers/message/index';
import { APIError } from './type';
import { InternalError } from '~/apis/common/constant';

export const getExceptionPayload = (ex: unknown): APIError => {
  // if (typeof ex !== 'object' || !ex) {
  //   return UnhandledError;
  // }
  let error: APIError;
  const typedException = ex as APIError;
  const matchErrorStructure =
    Object.prototype.hasOwnProperty.call(ex, 'message') &&
    Object.prototype.hasOwnProperty.call(ex, 'code');

  if (matchErrorStructure) {
    typedException.showMessage = (messageService: MessageServiceProps) =>
      messageService.add({
        title: typedException.message,
        status: 'error',
      });

    error = typedException;
  } else {
    error = InternalError;
  }
  return error;
};
