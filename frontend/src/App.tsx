// Third party
import { Link, Outlet } from "react-router-dom";
// Contexts
import { ApiContextProvider } from "./utility/context/ApiContext.js";
import { AuthContextProvider } from "./utility/context/AuthContext.js";
// Custom hooks
// Components
import Main from "./components/Main/Main.js";
import Navigation from "./components/Navigation/Navigation.js";

function App() {
  return (
    // ApiContextProvider needs to be top-level because other contexts rely on it
    <ApiContextProvider>
      <AuthContextProvider>
        <Navigation className="header">
          <h1>Chat App</h1>
          <div>
            <Link to="/">Home</Link>
            <Link to="login">Login</Link>
            <Link to="signup">Sign up</Link>
          </div>
        </Navigation>
        <Main className="content">
          <Outlet />
        </Main>
      </AuthContextProvider>
    </ApiContextProvider>
  );
}

export default App;
