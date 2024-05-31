// Third party
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Context
import { useWebSocketContext } from "./WebSocketContext";
// Custom hooks
import { useFetch } from "@/hooks/useFetch";
// Types
import { ContextProps, GenericObject } from "@/types";

type OptionalObject = GenericObject | null;

const AuthContext = createContext({});
const AuthDispatchContext = createContext({});

function useAuthContext() {
  return useContext(AuthContext);
}

function useAuthDispatchContext() {
  return useContext(AuthDispatchContext);
}

function AuthContextProvider({ children }: ContextProps) {
  // State
  const [currentUser, setCurrentUser] = useState<OptionalObject>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const { socket } = useWebSocketContext();
  // React Router
  const location = useLocation();
  const navigate = useNavigate();
  // Custom hook
  const { fetchData } = useFetch();

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const userId = sessionStorage.getItem("userId");

        if (!userId) {
          return;
        }

        const parsedUserId = JSON.parse(userId);

        const response = await fetchData(
          `${import.meta.env.VITE_API_URL}/user/${parsedUserId}`
        );

        response && setCurrentUser(response);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
    }),
    [currentUser]
  );

  const api = useMemo(() => {
    const isUserAuthenticated = () => {
      return Boolean(sessionStorage.getItem("userId"));
    };

    const handleLogin = async (
      event: React.FormEvent<HTMLFormElement>,
      formData: GenericObject,
      setError?: React.Dispatch<React.SetStateAction<Boolean>>
    ) => {
      event.preventDefault();

      const response = await fetchData(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response) {
        const origin = location?.state?.from?.pathname || "/chat";

        sessionStorage.setItem("userId", JSON.stringify(response._id));
        setCurrentUser(response);
        return navigate(origin, { replace: true });
      }

      setError && setError(true);
    };

    const handleLogout = async () => {
      const response = await fetchData(
        `${import.meta.env.VITE_API_URL}/logout`,
        {
          method: "POST",
        }
      );

      if (response) {
        sessionStorage.removeItem("userId");
        setCurrentUser(null);
        socket.current.close();
        return navigate("/", { replace: true });
      }
    };

    return { handleLogin, handleLogout, isUserAuthenticated };
  }, []);

  return (
    <AuthDispatchContext.Provider value={api}>
      <AuthContext.Provider value={contextValue}>
        {!loading && children}
      </AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

export { AuthContextProvider, useAuthContext, useAuthDispatchContext };
