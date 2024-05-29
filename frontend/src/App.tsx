// React
import { Outlet } from "react-router-dom";
// Context
import { AuthContextProvider } from "@/providers/context";
import { WebSocketContextProvider } from "@/providers/context";

export function App() {
  return (
    <WebSocketContextProvider>
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </WebSocketContextProvider>
  );
}
