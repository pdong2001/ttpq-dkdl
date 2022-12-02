import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import publicRequest from '~/apis/common/axios';

export default function useSearch<RequestData, ResponseData>(
  requestConfig: AxiosRequestConfig<RequestData>,
  searchValue: string,
) {
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<ResponseData>();

  // useEffect(() => {
  //   setData();
  // }, [searchValue]);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    if (searchValue) {
      setLoaded(false);

      publicRequest
        .request<ResponseData>({
          ...requestConfig,
          cancelToken: source.token,
        })
        .then((res) => {
          setData(res.data);
          setTimeout(() => {
            setLoaded(true);
          }, 2000);
        })
        .catch((e) => {
          if (axios.isCancel(e)) {
            return;
          }
          setError(true);
          setLoaded(true);
        });
    }

    return () => searchValue && source.cancel();
  }, [searchValue]);

  return { loaded, error, data };
}
