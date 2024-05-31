import { GenericObject } from "@/types";

async function fetchWrapper(endpoint: string, options?: GenericObject) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
      credentials: "include",
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
  get: (endpoint: string, overrides?: GenericObject) =>
    fetchWrapper(endpoint, overrides),
  delete: (endpoint: string, overrides?: GenericObject) =>
    fetchWrapper(endpoint, {
      method: "DELETE",
      ...overrides,
    }),
  post: (endpoint: string, data: GenericObject, overrides?: GenericObject) =>
    fetchWrapper(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      ...overrides,
    }),
  put: (endpoint: string, data: GenericObject, overrides?: GenericObject) =>
    fetchWrapper(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...overrides,
    }),
};
