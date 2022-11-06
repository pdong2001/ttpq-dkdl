import { useEffect } from 'react';
import { APIError, APIStatus } from '~/apis/common/type';
import { UnhandledError } from '~/apis/common/constant';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { AxiosRequestConfig } from 'axios';
import { HttpAsyncAction } from '~/apis/request/slice';

const useAPIRequest = <Data = any>(
  arg: {
    name: string;
    method: HttpAsyncAction;
    config: AxiosRequestConfig;
    handlers?: {
      onFullfilled?: (data: Data) => void;
      onRejected?: (error: APIError) => void;
      onPending?: () => void;
    };
  },
  dependencies: any[] = [],
) => {
  const { name, method, config, handlers } = arg;
  const { onFullfilled, onPending, onRejected } = handlers || {};

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.response.isLoading);
  const response = useAppSelector((state) => state.response[name]) || false;

  useEffect(() => {
    dispatch(method({ config, name }));
  }, [...dependencies]);
  useEffect(() => {
    if (response && response.status === APIStatus.FULLFILLED && onFullfilled) {
      onFullfilled(response.data!);
    }
    if (response && response.status === APIStatus.REJECTED && onRejected) {
      onRejected(response.error || UnhandledError);
    }
    if (isLoading && onPending) {
      onPending();
    }
  }, []);
};

export default useAPIRequest;
