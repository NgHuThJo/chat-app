// React
import { Outlet, useLocation, Navigate } from "react-router-dom";
// Context
import { useAuthDispatchContext } from "@/providers/context";

export function AuthRoute() {
  const { isUserAuthenticated } = useAuthDispatchContext();
  const location = useLocation();

  return isUserAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
