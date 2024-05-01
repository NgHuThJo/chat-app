// Third party
import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { setup } from "../../utility/test/utilityTest";
// Components
import { AuthContextProvider } from "../../utility/context/AuthContext";
import LoginForm from "./LoginForm";

describe("loginform", () => {
  it("button is clicked", async () => {
    const { user } = setup(
      <MemoryRouter>
        <AuthContextProvider>
          <LoginForm />
        </AuthContextProvider>
      </MemoryRouter>
    );

    // await user.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
