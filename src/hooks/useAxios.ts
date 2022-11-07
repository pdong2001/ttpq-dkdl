import { useAppDispatch } from '~/hooks/reduxHook';
import { APIError } from './../apis/common/type';
import { AxiosRequestConfig } from 'axios';
import { useEffect, useState, useRef } from 'react';
import publicRequest from '~/apis/common/axios';
import { getExceptionPayload } from '~/apis/common/utils';
import { setGlobalLoading } from '~/components/Loading/slice';

const useAxios = <Data = any>(axiosParams: AxiosRequestConfig) => {
  const [data, setData] = useState<Data>();
  const [error, setError] = useState<APIError>();
  const [loading, setLoading] = useState(true);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };
  const dispatch = useAppDispatch();

  const makeRequest = async (params: AxiosRequestConfig) => {
    try {
      dispatch(setGlobalLoading(true));
      const res = await publicRequest.request({
        ...params,
        signal: controllerRef.current.signal,
      });
      setData(res.data);
    } catch (err: unknown) {
      setError(getExceptionPayload(err));
    } finally {
      setLoading(false);
      setTimeout(() => {
        dispatch(setGlobalLoading(false));
      }, 300);
    }
  };

  useEffect(() => {
    makeRequest(axiosParams);
  }, [axiosParams.url]);

  return { data, error, loading, cancel };
};

export default useAxios;
