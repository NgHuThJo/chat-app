import { createContext, useContext, useMemo } from "react";
import { ComponentBaseProps } from "../types/utilityType";

// Context creators
const ApiContext = createContext({});

// Context getters
function useApiContext() {
  return useContext(ApiContext);
}

function ApiContextProvider({ children }: ComponentBaseProps) {
  const baseUrl = "http://localhost:3000";
  const apiBaseUrl = `${baseUrl}/api`;
  const webSocketBaseUrl = "ws://localhost:8080";

  const contextValue = useMemo(
    () => ({
      baseUrl,
      apiBaseUrl,
      webSocketBaseUrl,
    }),
    []
  );

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}

export { ApiContextProvider, useApiContext };
