// Third party
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Components
import App from "../App.js";
import AppLayout from "./AppLayout/AppLayout.js";
import ErrorPage from "./Error/ErrorPage.js";
import Home from "./Home/Home.js";
import LoginForm from "./Login/LoginForm.js";
import SignupForm from "./Signup/SignupForm.js";

export const routesConfig = [
  {
    element: <AppLayout />,
    children: [
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
    ],
  },
];

export function Router() {
  // Paths are case-insensitive, isSensitive prop of Route component has value false by default
  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}
