// Third party
import { render, screen } from "@testing-library/react";
import SignupForm from "./SignupForm";

describe("signup form", () => {
  render(<SignupForm />);

  expect(screen.getByRole("button")).toBeEnabled();
});
