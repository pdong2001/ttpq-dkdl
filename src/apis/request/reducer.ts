import { createReducer } from '@reduxjs/toolkit';
import { appRequest } from './action';
import { APIStatus, RequestData } from './type';

const initialState: RequestData = {
  status: APIStatus.IDLE,
  data: undefined,
  error: undefined,
};

const requestReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(appRequest.pending, (state) => {
      state.status = APIStatus.PENDING;
    })
    .addCase(appRequest.fulfilled, (state, action) => {
      state.status = APIStatus.FULLFILLED;
      state.data = action.payload;
    })
    .addCase(appRequest.rejected, (state, action) => {
      state.status = APIStatus.REJECTED;
      state.data = action.payload;
    });
});

export default requestReducer;
