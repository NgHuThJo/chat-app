// Third party
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Components
import App from "../App.jsx";
import Authentication from "./Authentication/Authentication.js";
import ErrorPage from "./Error/ErrorPage.js";
import Home from "./Home/Home.js";
import LoginForm from "./Login/LoginForm.js";
import SignupForm from "./Signup/SignupForm.js";

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
          path: "login",
          element: <LoginForm />,
        },
        {
          path: "signup",
          element: <SignupForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
