import { APIError } from './type';
import { createAsyncThunk } from '@reduxjs/toolkit';
import publicRequest from './axios';
import { getExceptionPayload } from './utils';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const hasParamsMethod = ['get', 'GET', 'put', 'PUT'];
export const createAsyncRequest = <Request = any, Response = any>(
  type: string,
  config: AxiosRequestConfig,
  convertResponse?: (response: AxiosResponse) => Response,
) =>
  createAsyncThunk<Response, Request, { rejectValue: APIError }>(type, async (data, ThunkAPI) => {
    try {
      // const;
      let response;
      if (!data) {
        response = await publicRequest.request({ ...config });
        return convertResponse ? convertResponse(response) : response.data;
      }
      const isParamsMethod = hasParamsMethod.includes(config.method?.toLocaleLowerCase() as string);
      const paramsOrData = isParamsMethod ? { params: data } : { data };

      response = await publicRequest.request({ ...config, ...paramsOrData });
      console.log('response', response.data.data);
      return convertResponse ? convertResponse(response) : response.data;
    } catch (ex) {
      return ThunkAPI.rejectWithValue(getExceptionPayload(ex));
    }
  });

// export const APIRequest =
