// React
import { useState } from "react";
// Types
import { GenericObject } from "@/types";

export function useFetch() {
  const [data, setData] = useState<GenericObject>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (url: string, options?: GenericObject) => {
    try {
      const response = await fetch(url, {
        credentials: "include",
        mode: "cors",
        ...options,
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const json = await response.json();
      setData(json);

      return json;
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
}
