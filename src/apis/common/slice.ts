import { ActionReducerMapBuilder, createSlice, Draft } from '@reduxjs/toolkit';
import {
  APIStatus,
  AsyncAction,
  ErrorPayloadAction,
  ResponseData,
  SuccessPayloadAction,
} from './type';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit/dist/createSlice';

type AsyncReducers<Response, Request = any> = {
  action: AsyncAction<Response, Request>;
  onFullfilled?: (
    state: Draft<NoInfer<ResponseData<Response>>>,
    action: SuccessPayloadAction<Response>,
  ) => void;
  onRejected?: (state: Draft<NoInfer<ResponseData<Response>>>, action: ErrorPayloadAction) => void;
};

const createAppSlice = <State extends ResponseData>(
  sliceName: string,
  initialState: ResponseData<State['data']>,
  reducers: ValidateSliceCaseReducers<
    ResponseData<State['data']>,
    SliceCaseReducers<ResponseData<State['data']>>
  >,
  asyncReducers: AsyncReducers<State['data']>[],
) => {
  const _initialState: ResponseData<State['data']> = {
    status: APIStatus.IDLE,
    data: undefined,
    error: undefined,
  };
  const commonReducers = (
    builder: ActionReducerMapBuilder<NoInfer<ResponseData<State['data']>>>,
  ) => {
    asyncReducers.reduce((build, { action, onFullfilled, onRejected }) => {
      return build
        .addCase(action.pending, (state) => {
          state.status = APIStatus.PENDING;
        })
        .addCase(action.fulfilled, (state, action) => {
          state.status = APIStatus.FULLFILLED;
          onFullfilled && onFullfilled(state, action);
        })
        .addCase(action.rejected, (state, action) => {
          state.status = APIStatus.REJECTED;
          state.error = action.payload;
          onRejected && onRejected(state, action);
        });
    }, builder);
  };
  return createSlice({
    name: sliceName,
    initialState: { ..._initialState, ...initialState },
    reducers: reducers || {},
    extraReducers: commonReducers,
  });
};

export default createAppSlice;
