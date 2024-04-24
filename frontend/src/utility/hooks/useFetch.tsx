// Third party
import { useState } from "react";
// Types
import { GeneralObject } from "../types/utilityType";

function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url: string, options?: GeneralObject) => {
    try {
      const response = await fetch(url, {
        mode: "cors",
        ...options,
      });

      if (response.status >= 400) {
        throw new Error("Server error");
      }

      const json = await response.json();
      setData(json);

      return json;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
}

export default useFetch;
