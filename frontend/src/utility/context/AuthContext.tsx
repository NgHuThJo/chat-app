// Third party
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [isUserLogged, setIsUserLogged] = useState(false);
  // Context
  const { apiBaseUrl } = useApiContext() as { apiBaseUrl: string };
  // React Router
  const navigate = useNavigate();
  // Custom hook
  const { error, fetchData } = useFetch();

  useEffect(() => {
    const userLogStatus = localStorage.getItem("isUserLogged");

    if (userLogStatus !== null) {
      setIsUserLogged(JSON.parse(userLogStatus));
    }
  });

  const contextValue = useMemo(
    () => ({
      error,
      isUserLogged,
    }),
    [error, isUserLogged]
  );

  const api = useMemo(() => {
    const handleLogin = async (
      event: React.FormEvent<HTMLFormElement>,
      formData: GeneralObject
    ) => {
      event.preventDefault();

      // Current implementation might return JSON or undefined
      // const serverResponse = await fetchData(`${apiBaseUrl}/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // TODO: implement how frontend handles serverResponse by either logging in user or showing error

      // MOCK IMPLEMENTATION OF LOGIN
      localStorage.setItem("isUserLogged", JSON.stringify(true));
      setIsUserLogged(true);
      console.log("User logged in");
      navigate("/");
    };

    const handleLogout = () => {
      localStorage.setItem("isUserLogged", JSON.stringify(false));
      setIsUserLogged(false);
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
