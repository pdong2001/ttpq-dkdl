import { useAppDispatch } from '~/hooks/reduxHook';
import { APIError } from '~/apis/common/type';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
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

  const CancelToken = axios.CancelToken;
  const cancel = CancelToken.source();

  const dispatch = useAppDispatch();
  const makeRequest = async (axiosParams: AxiosRequestConfig) => {
    const { transformResponse } = axiosParams;

    try {
      !hideSpinner && dispatch(setGlobalLoading(true));
      const res = await publicRequest.request({
        cancelToken: cancel.token,
        ...axiosParams,
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
      if (axios.isCancel(err)) {
        return;
      }
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
