import { setGlobalLoading } from '~/components/Loading/slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIError } from '~/apis/common/type';
import publicRequest from '~/apis/common/axios';
import { getExceptionPayload } from '~/apis/common/utils';

export const createAsyncRequest = <Request = any, Response = any>(
  type: string,
  initConfig: AxiosRequestConfig,
  convertResponse?: (response: AxiosResponse<Response, Request>['data']) => Response,
) =>
  createAsyncThunk<Response, AxiosRequestConfig<Request>, { rejectValue: APIError }>(
    type,
    async (requestConfig, ThunkAPI) => {
      try {
        ThunkAPI.dispatch(setGlobalLoading(true));
        const { transformResponse } = requestConfig;
        const response = await publicRequest.request({
          transformResponse: [
            axios.defaults.transformResponse?.[0],
            (res) => {
              if (transformResponse) {
                // @ts-ignore
                return transformResponse(res);
              }
              return res;
            },
          ],
          ...initConfig,
          ...requestConfig,
        });
        return convertResponse ? convertResponse(response.data) : response.data;
      } catch (ex) {
        return ThunkAPI.rejectWithValue(getExceptionPayload(ex));
      } finally {
        ThunkAPI.dispatch(setGlobalLoading(false));
      }
    },
  );