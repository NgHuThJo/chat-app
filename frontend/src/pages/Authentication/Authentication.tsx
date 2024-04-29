import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../utility/context/AuthContext.tsx";

function Authentication() {
  const { isUserLogged } = useAuthContext() as { isUserLogged: boolean };
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Auth");

    if (!isUserLogged) {
      navigate("/login", { replace: true });
    }
  }, []);

  return <Outlet />;
}

export default Authentication;
