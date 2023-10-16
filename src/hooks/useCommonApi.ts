import { useCallback, useEffect, useState } from 'react';
import BASEAPI from '../API/config';

const useCommonApi = <T>(url: string, method?: string, body?: any) => {
  const api: any = BASEAPI();

  const [data, setData] = useState<T[] | null>(null);

  const [isLoading, SetIsLoading] = useState(true);

  const [error, setError] = useState<T | null>(null);

  const makeRequest = useCallback(
    async (url: string, method?: string, params?: any) => {
      try {
        if (method === 'POST') {
          const response = await api.post(url, JSON.stringify(params));
          const res = await response.data?.data.reverse();
          setData(res);
        } else if (method === 'PATCH') {
          const response = await api.patch(url, params);
          const data = await response.data?.data;
          setData(data);
        } else if (method === 'DELETE') {
          const response = await api.delete(`${url}/${params}`);
          const res = await response.data?.data;
          setData(res);
        } else {
          const response = await api.get(url);
          if (params) {
            const data = await response.data?.data;
            setData(data);
          } else {
            const data = await response.data?.data.reverse();
            setData(data);
          }
        }
        SetIsLoading(false);
      } catch (error: any) {
        if (error?.response) {
          setError(error?.response.data.errors);
          SetIsLoading(false);
        }
      }
    },
    [url, method, body]
  );

  useEffect(() => {
    makeRequest(url, method, body);
  }, [url, method, body]);

  return {
    data,
    isLoading,
    error,
    makeRequest
  };
};

export default useCommonApi;
