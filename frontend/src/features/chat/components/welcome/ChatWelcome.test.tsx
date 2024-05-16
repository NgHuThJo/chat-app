// Third party
import { render, screen } from "@testing-library/react";
// Components
import { ChatWelcome } from "./ChatWelcome";
// Types

describe("chat welcome", () => {
  // Happy path
  it("should show image", async () => {
    render(<ChatWelcome />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
