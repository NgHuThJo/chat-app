import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../utility/context/AuthContext.tsx";

function Authentication() {
  const { isUserLogged } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLogged) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, []);

  return isUserLogged ? <Outlet /> : null;
}

export default Authentication;
