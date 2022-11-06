import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState, useRef } from 'react';
import publicRequest from '~/apis/common/axios';

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [data, setData] = useState<AxiosResponse['data']>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(true);
  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      const res = await publicRequest.request({
        ...params,
        signal: controllerRef.current.signal,
      });
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParams);
  }, []);

  return { data, error, loading, cancel };
};

export default useAxios;
