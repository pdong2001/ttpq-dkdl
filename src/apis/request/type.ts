import { Method } from 'axios';

export enum APIStatus {
  IDLE,
  PENDING,
  REJECTED,
  FULLFILLED,
}

export type APIError = {
  Message: string;
  Code: number;
};

// export type DataType = any;

export type APIData<DataType = any> = {
  status: APIStatus;
  error?: APIError;
  data?: DataType;
};

export enum HTTP {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
}

export type AxiosRequest = {
  method: Method;
  endPoint: string;
};

export type RequestData = APIData<any>;
