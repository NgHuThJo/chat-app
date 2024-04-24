// Third party
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Components
import App from "../App.jsx";
import ErrorPage from "./Error/ErrorPage.js";
import Home from "./Home/Home.js";
import Game from "./Game/Game.js";
import Leaderboard from "./Leaderboard/Leaderboard.js";
import UploadForm from "./Upload/UploadForm.js";

function Router() {
  // Paths are case-insensitive, isSensitive prop of Route component has value false by default
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage className="error-page" />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "upload",
          element: <UploadForm />,
        },
        {
          path: "game/:id",
          element: <Game />,
        },
        {
          path: "leaderboard",
          element: <Leaderboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
