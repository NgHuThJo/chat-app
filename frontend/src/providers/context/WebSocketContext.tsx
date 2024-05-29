// Third party
import { createContext, useContext, useMemo, useRef } from "react";
// Types
import { ContextProps } from "@/types";

const WebSocketContext = createContext({});
const WebSocketDispatchContext = createContext({});

export function useWebSocketContext() {
  return useContext(WebSocketContext);
}

export function useWebSocketDispatchContext() {
  return useContext(WebSocketDispatchContext);
}

export function WebSocketContextProvider({ children }: ContextProps) {
  const socket = useRef<WebSocket>();
  const pingSocketReducer = {};
  const pongSocketReducer = {};

  const contextValue = useMemo(() => {
    return { pingSocketReducer, pongSocketReducer, socket };
  }, [pingSocketReducer, pongSocketReducer, socket]);

  const api = useMemo(() => {
    const createSocket = () => {
      socket.current = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);
    };
    return { createSocket };
  }, []);

  return (
    <WebSocketDispatchContext.Provider value={api}>
      <WebSocketContext.Provider value={contextValue}>
        {children}
      </WebSocketContext.Provider>
    </WebSocketDispatchContext.Provider>
  );
}
