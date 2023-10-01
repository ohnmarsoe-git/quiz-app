import { useState, useEffect } from 'react';

export function useApi(url:string, method: string) {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function makeRequest() {
      try {
        const response = await fetch(url, {
          method,
        });
        const data = await response.json();
        setResponse(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
        setIsLoading(false);
      }
    }

    makeRequest();
  }, [url, method]);

  return { response, isLoading, error };
}
