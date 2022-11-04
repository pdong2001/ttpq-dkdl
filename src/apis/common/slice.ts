import { ActionReducerMapBuilder, createSlice, Draft } from '@reduxjs/toolkit';
import {
  APIStatus,
  AppSyncAction,
  ErrorPayloadAction,
  RequestData,
  SuccessPayloadAction,
} from './type';
import { NoInfer } from '@reduxjs/toolkit/dist/tsHelpers';
import { SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit/dist/createSlice';

type AsyncReducers = {
  action: AppSyncAction;
  onFullfilled?: (state: Draft<NoInfer<RequestData>>, action: SuccessPayloadAction) => void;
  onRejected?: (state: Draft<NoInfer<RequestData>>, action: ErrorPayloadAction) => void;
};

const createAppSlide = (
  sliceName: string,
  initialState: RequestData,
  asyncReducers: AsyncReducers[],
  reducers?: ValidateSliceCaseReducers<RequestData, SliceCaseReducers<RequestData>>,
) => {
  const _initialState: RequestData = {
    status: APIStatus.IDLE,
    data: undefined,
    error: undefined,
  };
  const commonReducers = (builder: ActionReducerMapBuilder<NoInfer<RequestData>>) => {
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

export default createAppSlide;
