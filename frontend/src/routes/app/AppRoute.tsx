// React
import { Link, Outlet } from "react-router-dom";
// Context
import {
  useAuthContext,
  useAuthDispatchContext,
} from "@/providers/context/AuthContext";
// Components
import { Main } from "@/components/ui/main";
import { Navigation } from "@/components/ui/navigation";

export function AppRoute() {
  const { currentUser } = useAuthContext();
  const { handleLogout } = useAuthDispatchContext();

  return (
    <>
      <Navigation className={{ module: ["header"] }}>
        <h1>
          <Link to="/">Chat App</Link>
        </h1>
        <div>
          <Link to="/">Home</Link>
          {!currentUser && <Link to="login">Login</Link>}
          {currentUser && <a onClick={handleLogout}>Logout</a>}
          <Link to="chat">Chat</Link>
          <Link to="signup">Sign up</Link>
        </div>
      </Navigation>
      <Main className={{ module: ["content"] }}>
        <Outlet />
      </Main>
    </>
  );
}
