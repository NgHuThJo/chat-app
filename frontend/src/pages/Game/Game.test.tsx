// Third party
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

describe("Game", () => {
  type RouterReturnType = ReturnType<typeof createMemoryRouter>;

  let location: object;
  let router: RouterReturnType;

  beforeAll(() => {
    location = {
      path: "/",
      state: {
        src: "random_string",
      },
    };

    router = createMemoryRouter(
      [
        {
          path: "/",
          element: <Game />,
        },
      ],
      {
        initialEntries: [location],
      }
    );
  });

  it("Should load image", () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByRole("img")).not.toBe(null);
  });

  it("Click on image should open dropdown", () => {
    const user = userEvent.setup();
  });
});
