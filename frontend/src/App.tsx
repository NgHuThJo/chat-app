// React
import { Outlet } from "react-router-dom";
// Context
import { AuthContextProvider } from "@/providers/context";

export function App() {
  return (
    <AuthContextProvider>
      <Outlet />
    </AuthContextProvider>
  );
}
