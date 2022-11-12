import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import publicRequest from '~/apis/common/axios';

export default function useSearch<RequestData, ResponseData>(
  requestConfig: AxiosRequestConfig<RequestData>,
  searchValue: string,
) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<ResponseData>();

  // useEffect(() => {
  //   setData();
  // }, [searchValue]);

  useEffect(() => {
    setError(false);
    let cancel;
    if (searchValue) {
      setLoaded(false);

      publicRequest
        .request<ResponseData>({
          ...requestConfig,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
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
    } else {
      setLoaded(false);
    }

    return () => searchValue && cancel();
  }, [searchValue]);

  return { loaded, error, data };
}
