// Third party
import { Link, Outlet } from "react-router-dom";
// Custom hooks
// Components
import Navigation from "./components/Navigation/Navigation.js";

function App() {
  return (
    <>
      <Navigation className="navigation">
        <Link to="/">Home</Link>
        <Link to="upload">Upload files</Link>
        <Link to="leaderboard">Show leaderboard</Link>
      </Navigation>
      <main className="container">
        <h1>Where is Waldo</h1>
        <Outlet />
      </main>
    </>
  );
}

export default App;
