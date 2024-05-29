// Third party
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
// Types
import { GenericObject } from "@/types";
// Config
import { routesConfig } from "@/routes";
import { server } from "@/test/server";

describe("signup form", () => {
  type RouterReturnType = ReturnType<typeof createMemoryRouter>;
  let router: RouterReturnType;
  let user: GenericObject;

  beforeAll(() => {
    user = userEvent.setup();
    // Create in-memory router
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/signup"],
    });
  });

  // Happy path
  it("should redirect to home", async () => {
    render(<RouterProvider router={router} />);

    user.click(screen.getByRole("button"));

    await waitFor(() => expect(window.location.pathname).toBe("/"));
  });

  // Negative testing
  it("should show errors", async () => {
    server.use(
      http.post("/api/signup", () => {
        return HttpResponse.error();
      })
    );

    render(<RouterProvider router={router} />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByText("Your username is too short.")).toBeInTheDocument();
    expect(screen.getByText("Your password is too short.")).toBeInTheDocument();
  });
});
