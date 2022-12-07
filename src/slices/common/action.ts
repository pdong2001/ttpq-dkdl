import { formatUrl } from '~/utils/functions';
import { setGlobalLoading } from '~/components/Loading/slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { APIError } from '~/apis/common/type';
import publicRequest from '~/apis/common/axios';
import { getExceptionPayload } from '~/apis/common/utils';
type Optional<T> = { [K in keyof T]?: T[K] };
type ActionParam<Request> = AxiosRequestConfig<Request> & Optional<Request>;

export const createAsyncRequest = <Request = any, Response = any>(
  type: string,
  initConfig: AxiosRequestConfig,
  convertResponse?: (response: AxiosResponse<Response, Request>['data']) => Response,
) =>
  createAsyncThunk<Response, ActionParam<Request>, { rejectValue: APIError }>(
    type,
    async (requestConfig, ThunkAPI) => {
      try {
        ThunkAPI.dispatch(setGlobalLoading(true));
        const { transformResponse } = requestConfig;
        const url = requestConfig.url || initConfig.url;
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
          url: formatUrl(url, requestConfig),
        });
        return convertResponse ? convertResponse(response.data) : response.data;
      } catch (ex) {
        return ThunkAPI.rejectWithValue(getExceptionPayload(ex));
      } finally {
        ThunkAPI.dispatch(setGlobalLoading(false));
      }
    },
  );
