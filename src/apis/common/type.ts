import rootReducer from '~/reducers';
import { AllKeys } from '~/types';
import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { createAsyncAction } from '~/apis/common/action';

export enum APIStatus {
  IDLE,
  PENDING,
  REJECTED,
  FULLFILLED,
}

export type APIError = {
  message: string;
  code: number;
};

export type APIData<DataType = any> = {
  status?: APIStatus;
  error?: APIError;
  data?: DataType;
};

export type RequestData = APIData<any>;

export type AppReducer = AllKeys<typeof rootReducer>;

export type SuccessPayloadAction = PayloadAction<
  any,
  string,
  { arg: void; requestId: string; requestStatus: 'fulfilled' }
>;
export type ErrorPayloadAction = PayloadAction<
  APIError | undefined,
  string,
  | ({
      arg: void;
      requestId: string;
      requestStatus: 'rejected';
      aborted: boolean;
      condition: boolean;
    } & { rejectedWithValue: true })
  | ({
      arg: void;
      requestId: string;
      requestStatus: 'rejected';
      aborted: boolean;
      condition: boolean;
    } & { rejectedWithValue: false }),
  SerializedError
>;

export type AppSyncAction = ReturnType<typeof createAsyncAction>;
