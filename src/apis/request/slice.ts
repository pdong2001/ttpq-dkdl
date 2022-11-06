import { APIStatus, ResponseData } from './../common/type';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from '~/apis/request/index';
import { makeHttp } from '~/apis/common/action';

const initialState: Requests = {
  isLoading: false,
};
type Requests<Data = any> =
  | {
      [K: string]: ResponseData<Data>;
    }
  | { isLoading: boolean };
export type HttpAsyncAction = ReturnType<typeof makeHttp>;
export type HttpAction = ReturnType<HttpAsyncAction>;
const commonReducers =
  (asyncActions: HttpAsyncAction[]) => (builder: ActionReducerMapBuilder<NoInfer<Requests>>) => {
    asyncActions.reduce((_builder, action) => {
      return _builder
        .addCase(action.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(action.fulfilled, (state, { payload }) => {
          state.isLoading = false;
          state[payload.name] = { status: APIStatus.FULLFILLED, data: payload.data };
        })
        .addCase(action.rejected, (state, { payload, error }) => {
          state.isLoading = false;
          if (payload) {
            state[payload.name] = { error, status: APIStatus.REJECTED };
          }
        });
    }, builder);
  };
const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {},
  extraReducers: commonReducers([httpGet, httpPost, httpDelete, httpPut, httpPatch]),
});

const requestReducer = requestSlice.reducer;

export default requestReducer;
