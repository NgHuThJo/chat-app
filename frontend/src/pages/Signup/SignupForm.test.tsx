// Third party
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
// Config
import { routesConfig } from "../Router";

describe("signup form", () => {
  type RouterReturnType = ReturnType<typeof createMemoryRouter>;

  let router: RouterReturnType;

  beforeAll(() => {
    // Create in-memory router
    router = createMemoryRouter(routesConfig, {
      initialEntries: ["/signup"],
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should render button", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("button")).toHaveTextContent("Sign up");
  });

  it("should redirect to home", async () => {
    const user = userEvent.setup();

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("button")).toHaveTextContent("Sign up");

    await user.click(screen.getByRole("button"));
  });
});
