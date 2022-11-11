import { getExceptionPayload } from '~/apis/common/utils';
import axios, { AxiosError, AxiosResponse } from 'axios';
// import store from '~/store';

// const { dispatch } = store;

export const onFullfilledRequest = (response: AxiosResponse) => response;
export const onRejectedResponse = (error: any): any => {
  if (error instanceof AxiosError) {
    return Promise.reject(getExceptionPayload(error.response?.data));
  }
  return Promise.reject(getExceptionPayload(error));
};

const publicRequest = axios.create({
  baseURL: `${import.meta.env.TTPQ_BASE_URL}`,
});

publicRequest.interceptors.response.use(onFullfilledRequest, onRejectedResponse);

export default publicRequest;
