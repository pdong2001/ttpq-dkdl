import { APIError } from '~/apis/common/type';

export const InternalError: APIError = {
  message: 'Đã có lỗi xảy ra (500)',
  code: 500,
};
export const UnhandledError: APIError = {
  message: 'Lỗi chưa xác định (400)',
  code: 400,
};
