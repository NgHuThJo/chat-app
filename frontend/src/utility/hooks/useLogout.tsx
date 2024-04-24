import { useNavigate } from "react-router-dom";
import { useApiContext } from "../context/ApiContext";
import { useLoginDispatchContext } from "../context/LoginContext";
import useFetch from "./useFetch";

function useLogout() {
  const { apiBaseUrl } = useApiContext();
  const { setIsLoggedIn } = useLoginDispatchContext();
  const { error, fetchData } = useFetch();
  const navigate = useNavigate();
  const logoutUrl = apiBaseUrl + "/api/login";

  const onLogout = async () => {
    const message = await fetchData(logoutUrl, {
      method: "DELETE",
    });

    console.log("Logout", message);

    if (message) {
      localStorage.setItem("userLogged", JSON.stringify(false));
      setIsLoggedIn(false);
      console.log("User logged out");
      navigate("/");
    }
  };

  return { error, onLogout };
}

export default useLogout;
