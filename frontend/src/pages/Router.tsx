// Third party
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Components
import App from "../App.js";
import AppLayout from "./AppLayout/AppLayout.js";
import Authentication from "./Authentication/Authentication.js";
import ChatForm from "./ChatForm/ChatForm.js";
import ChatLayout from "./ChatLayout/ChatLayout.js";
import ErrorPage from "./Error/ErrorPage.js";
import Home from "./Home/Home.js";
import LoginForm from "./Login/LoginForm.js";
import SignupForm from "./Signup/SignupForm.js";

export const routesConfig = [
  {
    element: <AppLayout />,
    errorElement: <ErrorPage className="error-page" />,
    children: [
      {
        path: "/",
        element: <App />,
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
          {
            path: "chat",
            element: <Authentication />,
            children: [
              {
                index: true,
                element: <ChatLayout />,
              },
              {
                path: "form",
                element: <ChatForm />,
              },
            ],
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
