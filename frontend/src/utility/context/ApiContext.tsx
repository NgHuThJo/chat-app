import { createContext, useContext, useMemo } from "react";
import { ComponentBaseProps } from "../types/utilityType";

// Context creators
const ApiContext = createContext<object>({});

// Context getters
function useApiContext() {
  return useContext(ApiContext);
}

function ApiContextProvider({ children }: ComponentBaseProps) {
  const apiBaseUrl = "http://localhost:3000";

  const contextValue = useMemo(
    () => ({
      apiBaseUrl,
    }),
    [apiBaseUrl]
  );

  return (
    <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
  );
}

export { ApiContextProvider, useApiContext };
