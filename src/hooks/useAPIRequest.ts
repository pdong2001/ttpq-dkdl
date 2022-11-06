import { useEffect } from 'react';
import { APIError, APIStatus } from '~/apis/common/type';
import { UnhandledError } from '~/apis/common/constant';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHook';
import { AxiosRequestConfig } from 'axios';
import { HttpAsyncAction } from '~/apis/request/slice';

const useAPIRequest = <Data = any>(arg: {
  name: string;
  method: HttpAsyncAction;
  config: AxiosRequestConfig;
  handlers: {
    onFullfilled?: (data: Data) => void;
    onRejected?: (error: APIError) => void;
    onPending?: () => void;
  };
}) => {
  const { name, method, config, handlers } = arg;
  const { onFullfilled, onPending, onRejected } = handlers;

  const dispatch = useAppDispatch();
  const responses = useAppSelector((state) => state.response);
  const response = useAppSelector((state) => state.response[name]);
  useEffect(() => {
    dispatch(method({ config, name }));
  }, []);
  useEffect(() => {
    if (response && response.status === APIStatus.FULLFILLED && onFullfilled) {
      onFullfilled(response.data!);
    }
    if (response && response.status === APIStatus.REJECTED && onRejected) {
      onRejected(response.error || UnhandledError);
    }
    if (responses.isLoading && onPending) {
      onPending();
    }
  }, [responses.isLoading, response, response?.status, onFullfilled, onPending, onRejected]);
};

export default useAPIRequest;
