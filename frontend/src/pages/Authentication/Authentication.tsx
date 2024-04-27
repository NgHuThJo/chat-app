import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../utility/context/AuthContext.tsx";

function Authentication() {
  const { isUserLogged } = useAuthContext() as { isUserLogged: boolean };
  const navigate = useNavigate();

  return isUserLogged ? <Outlet /> : navigate("/login", { replace: true });
}

export default Authentication;
