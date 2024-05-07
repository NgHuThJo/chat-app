// Third party
import { Outlet } from "react-router-dom";
// Contexts
import { ApiContextProvider } from "../../utility/context/ApiContext.js";
import { AuthContextProvider } from "../../utility/context/AuthContext.js";

function AppLayout() {
  // ApiContextProvider needs to be top-level because other contexts rely on it
  return (
    <ApiContextProvider>
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </ApiContextProvider>
  );
}

export default AppLayout;
