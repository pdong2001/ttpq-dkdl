import { ActionReducerMapBuilder, createSlice, Draft } from '@reduxjs/toolkit';
import {
  APIError,
  AsyncAction,
  ErrorPayloadAction,
  ReduxState,
  ResponseData,
  SuccessPayloadAction,
} from './type';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit/dist/createSlice';

type AsyncReducers<Response extends ResponseData, Request = any> = {
  action: AsyncAction<Response, Request>;
  onFullfilled?: (
    state: Draft<NoInfer<ReduxState<Response['data']>>>,
    action: SuccessPayloadAction<Response>,
  ) => Response['data'];
  onRejected?: (
    state: Draft<NoInfer<ReduxState<Response>>>,
    action: ErrorPayloadAction,
  ) => APIError | undefined;
};

const createAppSlice = <State extends ReduxState, Response extends ResponseData = ResponseData>(
  sliceName: string,
  initialState: ReduxState<State['data']>,
  reducers: ValidateSliceCaseReducers<
    ReduxState<State['data']>,
    SliceCaseReducers<ReduxState<State['data']>>
  >,
  asyncReducers: AsyncReducers<Response>[],
) => {
  const _initialState: ReduxState<State['data']> = {
    loaded: false,
    data: undefined,
    error: undefined,
  };
  const commonReducers = (
    builder: ActionReducerMapBuilder<NoInfer<ReduxState<Response | any>>>,
  ) => {
    asyncReducers.reduce((build, { action, onFullfilled, onRejected }) => {
      return build
        .addCase(action.pending, (state) => {
          state.loaded = false;
        })
        .addCase(action.fulfilled, (state, action) => {
          state.loaded = true;
          if (onFullfilled) {
            state.data = onFullfilled(state, action);
          }
        })
        .addCase(action.rejected, (state, action) => {
          state.loaded = true;
          if (onRejected) {
            state.error = onRejected(state, action);
          }
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
