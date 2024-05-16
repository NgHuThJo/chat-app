import { GeneralObject } from "@/types";

async function fetchWrapper(endpoint: string, options?: GeneralObject) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      mode: "cors",
      ...options,
    });

    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.log((error as Error).message);
  }
}

export const apiClient = {
  get: (endpoint: string) => fetchWrapper(endpoint),
  delete: (endpoint: string) =>
    fetchWrapper(endpoint, {
      method: "DELETE",
    }),
  post: (endpoint: string, data: GeneralObject) =>
    fetchWrapper(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
  put: (endpoint: string, data: GeneralObject) =>
    fetchWrapper(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
