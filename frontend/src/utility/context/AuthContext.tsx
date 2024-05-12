// Third party
import { createContext, useContext, useEffect, useMemo, useState } from "react";
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
  // State
  const [isUserLogged, setIsUserLogged] = useState(() => {
    const userLogStatus = sessionStorage.getItem("isUserLogged");
    return userLogStatus ? JSON.parse(userLogStatus) : false;
  });
  const [currentUser, setCurrentUser] = useState({});
  // Context
  const { apiBaseUrl } = useApiContext();
  // React Router
  const location = useLocation();
  const navigate = useNavigate();
  // Custom hook
  const { fetchData } = useFetch();

  useEffect(() => {
    const getUser = async () => {
      const userId = sessionStorage.getItem("userId");

      if (!userId) {
        return;
      }

      const response = await fetchData(`${apiBaseUrl}/user/${userId}`);

      if (response) {
        setCurrentUser(response);
      }
    };

    getUser();
  }, []);

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

        sessionStorage.setItem("isUserLogged", JSON.stringify(true));
        setIsUserLogged(true);
        sessionStorage.setItem("userId", response._id);
        setCurrentUser(response);
        navigate(origin);

        return;
      }

      setError && setError(true);
    };

    const handleLogout = () => {
      sessionStorage.setItem("isUserLogged", JSON.stringify(false));
      setIsUserLogged(false);
      sessionStorage.setItem("userId", "");
      setCurrentUser({});
      navigate("/");
    };

    return { handleLogin, handleLogout };
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
