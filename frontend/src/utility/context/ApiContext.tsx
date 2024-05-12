import { createContext, useContext, useMemo } from "react";
import { ComponentBaseProps } from "../types/utilityType";

// Context creators
const ApiContext = createContext({});

const ApiDispatchContext = createContext({});

// Context getters
function useApiContext() {
  return useContext(ApiContext);
}

function useApiDispatchContext() {
  return useContext(ApiDispatchContext);
}

function ApiContextProvider({ children }: ComponentBaseProps) {
  const baseUrl = "http://localhost:3000";
  const apiBaseUrl = `${baseUrl}/api`;
  const webSocketBaseUrl = "ws://localhost:8080";

  const api = useMemo(() => {
    const createSocket = () => {
      const socket = new WebSocket(webSocketBaseUrl);

      return socket;
    };

    return { createSocket };
  }, []);

  const contextValue = useMemo(
    () => ({
      baseUrl,
      apiBaseUrl,
      webSocketBaseUrl,
    }),
    []
  );

  return (
    <ApiDispatchContext.Provider value={api}>
      <ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
    </ApiDispatchContext.Provider>
  );
}

export { ApiContextProvider, useApiContext, useApiDispatchContext };
