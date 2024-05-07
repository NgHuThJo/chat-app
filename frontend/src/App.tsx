// Third party
import { Link, Outlet } from "react-router-dom";
// Contexts
import {
  useAuthContext,
  useAuthDispatchContext,
} from "./utility/context/AuthContext.js";
// Custom hooks
// Components
import Main from "./components/Main/Main.js";
import Navigation from "./components/Navigation/Navigation.js";

function App() {
  const { isUserLogged } = useAuthContext();
  const { handleLogout } = useAuthDispatchContext();

  return (
    <>
      <Navigation className="header">
        <h1>Chat App</h1>
        <div>
          <Link to="/">Home</Link>
          {!isUserLogged && <Link to="login">Login</Link>}
          {isUserLogged && <a onClick={handleLogout}>Logout</a>}
          <Link to="signup">Sign up</Link>
        </div>
      </Navigation>
      <Main className="content">
        <Outlet />
      </Main>
    </>
  );
}

export default App;
