import { useAppDispatch } from '~/hooks/reduxHook';
import { APIError } from '~/apis/common/type';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState, useRef } from 'react';
import publicRequest from '~/apis/common/axios';
import { getExceptionPayload } from '~/apis/common/utils';
import { setGlobalLoading } from '~/components/Loading/slice';

const useAxios = <Data = any>(
  axiosParams: AxiosRequestConfig,
  dependencies: any[] = [],
  hideSpinner?: boolean,
) => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<APIError>();
  const [loaded, setLoaded] = useState(false);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };
  const dispatch = useAppDispatch();

  const makeRequest = async (params: AxiosRequestConfig) => {
    try {
      !hideSpinner && dispatch(setGlobalLoading(true));
      const res = await publicRequest.request({
        ...params,
        signal: controllerRef.current.signal,
      });
      setData(res.data);
    } catch (err: unknown) {
      setError(getExceptionPayload(err));
    } finally {
      setLoaded(true);
      !hideSpinner && dispatch(setGlobalLoading(false));
    }
  };

  useEffect(() => {
    makeRequest(axiosParams);
  }, [...dependencies]);

  return { data, error, loaded, cancel };
};

export default useAxios;
