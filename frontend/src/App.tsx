// Third party
import { Link, Outlet } from "react-router-dom";
// Contexts
import { ApiContextProvider } from "./utility/context/ApiContext.js";
import { AuthContextProvider } from "./utility/context/AuthContext.js";
// Custom hooks
// Components
import Navigation from "./components/Navigation/Navigation.js";

function App() {
  return (
    // ApiContextProvider needs to be top-level because other contexts rely on it
    <ApiContextProvider>
      <AuthContextProvider>
        <Navigation className="navigation">
          <Link to="/">Home</Link>
          <Link to="login">Login</Link>
          <Link to="leaderboard">Show leaderboard</Link>
        </Navigation>
        <main className="container">
          <h1>Chat App</h1>
          <Outlet />
        </main>
      </AuthContextProvider>
    </ApiContextProvider>
  );
}

export default App;
