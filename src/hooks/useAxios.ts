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

  const makeRequest = async (params: AxiosRequestConfig) => {
    const { transformResponse } = params;
    try {
      !hideSpinner && dispatch(setGlobalLoading(true));
      const ourAxios = useOriginAxios ? axios : publicRequest;
      const res = await ourAxios.request({
        signal: controllerRef.current.signal,
        ...params,
        transformResponse: (res) => {
          let response;
          try {
            response = JSON.parse(res);
            if (transformResponse) {
              //@ts-ignore
              return transformResponse(response);
            }
          } catch (error) {
            throw Error(`[requestClient] Error parsingJSON data - ${JSON.stringify(error)}`);
          }
          return response;
        },
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
