import { createContext, useContext, useMemo, useState } from "react";
import { ContextProps } from "../types/utilityType.tsx";

const LoginContext = createContext({});
const LoginDispatchContext = createContext({});

function useLoginContext() {
  return useContext(LoginContext);
}

function useLoginDispatchContext() {
  return useContext(LoginDispatchContext);
}

function LoginContextProvider({ children }: ContextProps) {
  const isLoggedInString = localStorage.getItem("userLogged");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    isLoggedInString ? JSON.parse(isLoggedInString) : false
  );

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
    }),
    [isLoggedIn]
  );

  const api = useMemo(() => {
    return { setIsLoggedIn };
  }, []);

  return (
    <LoginDispatchContext.Provider value={api}>
      <LoginContext.Provider value={contextValue}>
        {children}
      </LoginContext.Provider>
    </LoginDispatchContext.Provider>
  );
}

export { LoginContextProvider, useLoginContext, useLoginDispatchContext };
