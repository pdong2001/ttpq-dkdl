import { APIError } from './type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import publicRequest from './axios';
import { getExceptionPayload } from './utils';
import { AxiosRequestConfig } from 'axios';

export const appRequest = createAsyncThunk<any, AxiosRequestConfig, { rejectValue: APIError }>(
  'request',
  async (config, { rejectWithValue }) => {
    try {
      const response = await publicRequest.request(config);
      return response.data;
    } catch (ex) {
      return rejectWithValue(getExceptionPayload(ex));
    }
  },
);

type AppRequestAction = ReturnType<typeof appRequest>;

export const APIRequest = {
  get: (url: string, options: AxiosRequestConfig): AppRequestAction =>
    appRequest({ ...options, url, method: 'get' }),
  post: (url: string, options: AxiosRequestConfig): AppRequestAction =>
    appRequest({ ...options, url, method: 'post' }),
  delete: (url: string, options: AxiosRequestConfig): AppRequestAction =>
    appRequest({ ...options, url, method: 'delete' }),
  put: (url: string, options: AxiosRequestConfig): AppRequestAction =>
    appRequest({ ...options, url, method: 'put' }),
  patch: (url: string, options: AxiosRequestConfig): AppRequestAction =>
    appRequest({ ...options, url, method: 'patch' }),
};
