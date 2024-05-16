// React
import { useState } from "react";
// Types
import { GeneralObject } from "@/types";

export function useFetch() {
  const [data, setData] = useState<GeneralObject>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);

  const fetchData = async (url: string, options?: GeneralObject) => {
    try {
      const response = await fetch(url, {
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
