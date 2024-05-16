// React
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Global routes
import { AppRoute } from "./app/AppRoute";
import { ErrorRoute } from "./error/ErrorRoute";
import { HomeRoute } from "./home/HomeRoute";

// Feature routes
import { App } from "@/App";
import { AuthRoute } from "@/features/auth";
import { ChatRoute } from "@/features/chat";
import { LoginRoute } from "@/features/auth";
import { SignupRoute } from "@/features/auth";

export const routesConfig = [
  {
    element: <App />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <AppRoute />,
        children: [
          {
            index: true,
            element: <HomeRoute />,
          },
          {
            path: "login",
            element: <LoginRoute />,
          },
          {
            path: "signup",
            element: <SignupRoute />,
          },
          {
            path: "chat",
            element: <AuthRoute />,
            children: [
              {
                index: true,
                element: <ChatRoute />,
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
