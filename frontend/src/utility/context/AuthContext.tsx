// Third party
import { createContext, useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Contexts
import { useApiContext } from "./ApiContext.tsx";
// Custom hooks
import useFetch from "../hooks/useFetch.tsx";
// Types
import { ComponentBaseProps, GeneralObject } from "../types/utilityType.tsx";

const AuthContext = createContext({});
const AuthDispatchContext = createContext({});

function useAuthContext() {
  return useContext(AuthContext);
}

function useAuthDispatchContext() {
  return useContext(AuthDispatchContext);
}

function AuthContextProvider({ children }: ComponentBaseProps) {
  const userLogStatus = localStorage.getItem("isUserLogged");

  // State
  const [currentUser, setCurrentUser] = useState({});
  const [isUserLogged, setIsUserLogged] = useState(
    userLogStatus ? JSON.parse(userLogStatus) : false
  );
  // Context
  const { apiBaseUrl } = useApiContext();
  // React Router
  const location = useLocation();
  const navigate = useNavigate();
  // Custom hook
  const { fetchData } = useFetch();

  const contextValue = useMemo(
    () => ({
      currentUser,
      isUserLogged,
    }),
    [currentUser, isUserLogged]
  );

  const api = useMemo(() => {
    const handleLogin = async (
      event: React.FormEvent<HTMLFormElement>,
      formData: GeneralObject,
      setError?: React.Dispatch<React.SetStateAction<Boolean>>
    ) => {
      event.preventDefault();

      // Current implementation might return JSON or undefined
      const response = await fetchData(`${apiBaseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response) {
        const origin = location?.state?.from?.pathname || "/chat";

        localStorage.setItem("isUserLogged", JSON.stringify(true));
        setIsUserLogged(true);
        setCurrentUser(response);
        navigate(origin);

        return;
      }

      setError && setError(true);
    };

    const handleLogout = () => {
      localStorage.setItem("isUserLogged", JSON.stringify(false));
      setIsUserLogged(false);
      navigate("/");
    };

    return { handleLogin, handleLogout, setIsUserLogged };
  }, []);

  return (
    <AuthDispatchContext.Provider value={api}>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

export { AuthContextProvider, useAuthContext, useAuthDispatchContext };
