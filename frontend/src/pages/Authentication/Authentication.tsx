import { Outlet, useNavigate } from "react-router-dom";
import { useLoginContext } from "../../utility/context/LoginContext.tsx";

function Authentication() {
  const { isLoggedIn } = useLoginContext() as { isLoggedIn: boolean };
  const navigate = useNavigate();

  return isLoggedIn ? <Outlet /> : navigate("/login", { replace: true });
}

export default Authentication;
