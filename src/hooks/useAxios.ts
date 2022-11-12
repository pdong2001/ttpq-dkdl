import { useAppDispatch } from '~/hooks/reduxHook';
import { APIError } from '~/apis/common/type';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState, useRef } from 'react';
import publicRequest from '~/apis/common/axios';
import { getExceptionPayload } from '~/apis/common/utils';
import { setGlobalLoading } from '~/components/Loading/slice';

const useAxios = <Data = any>(
  axiosParams: AxiosRequestConfig,
  dependencies: any[] = [],
  useOriginAxios?: boolean,
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
  let cancelToken;

  const makeRequest = async (axiosParams: AxiosRequestConfig) => {
    const { transformResponse } = axiosParams;

    try {
      !hideSpinner && dispatch(setGlobalLoading(true));
      const ourAxios = useOriginAxios ? axios : publicRequest;
      const res = await ourAxios.request({
        signal: controllerRef.current.signal,
        ...axiosParams,
        cancelToken: new axios.CancelToken((c) => (cancelToken = c)),
        transformResponse: [
          axios.defaults.transformResponse?.[0],
          (res) => {
            if (transformResponse) {
              // @ts-ignore
              return transformResponse(res);
            }
            return res;
          },
        ],
      });

      setData(res.data);
    } catch (err: unknown) {
      setError(getExceptionPayload(err));
    } finally {
      setLoaded(true);
      !hideSpinner && dispatch(setGlobalLoading(false));
    }

    return cancel;
  };

  useEffect(() => {
    makeRequest(axiosParams);
    return () => cancelToken();
  }, [...dependencies]);

  return { data, error, loaded, cancel };
};

export default useAxios;
