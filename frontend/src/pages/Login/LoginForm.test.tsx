// Third party
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
// Types
import { GeneralObject } from "../../utility/types/utilityType";
// Config
import { routesConfig } from "../Router";
import { server } from "../../utility/test/server";

describe("signup form", () => {
  type RouterReturnType = ReturnType<typeof createMemoryRouter>;
  let router: RouterReturnType;
  let user: GeneralObject;

  beforeAll(() => {
    user = userEvent.setup();
    // Create in-memory router
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/login"],
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
      http.post("/login", () => {
        return HttpResponse.error();
      })
    );

    render(<RouterProvider router={router} />);

    await user.click(screen.getByRole("button"));

    expect(
      screen.getByText("Your username does not satisfy requirements.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Your password does not satisfy requirements.")
    ).toBeInTheDocument();
  });
});
