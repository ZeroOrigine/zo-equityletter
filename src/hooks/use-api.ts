'use client';

import { useState, useCallback } from 'react';

interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(async (
    url: string,
    options?: RequestInit
  ): Promise<{ data: T | null; error: string | null }> => {
    setState({ data: null, error: null, loading: true });
    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options?.headers },
        ...options,
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        const errorMsg = json.error || `Request failed with status ${res.status}`;
        setState({ data: null, error: errorMsg, loading: false });
        return { data: null, error: errorMsg };
      }
      setState({ data: json.data, error: null, loading: false });
      return { data: json.data, error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Network error';
      setState({ data: null, error: errorMsg, loading: false });
      return { data: null, error: errorMsg };
    }
  }, []);

  return { ...state, execute };
}
