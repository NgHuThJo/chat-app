// React
import { Link } from "react-router-dom";
// Context
import { useAuthDispatchContext } from "@/providers/context/AuthContext";
// Components
import { Button } from "@/components/ui/button/Button";
import { Form } from "@/components/ui/form/Form";

// Input fields
const inputFields = [
  {
    type: "text",
    id: "username",
    name: "username",
    label: "Username:",
    placeholder: "Your username...",
    errorMessage: "Your username is incorrect.",
  },
  {
    type: "password",
    id: "password",
    name: "password",
    label: "Password:",
    placeholder: "Your password...",
    errorMessage: "Your password is incorrect.",
  },
];

export function LoginForm() {
  const { handleLogin } = useAuthDispatchContext();

  return (
    <>
      <h2>Login to your account</h2>
      <Form
        className={{ module: ["default"] }}
        fields={inputFields}
        onSubmit={handleLogin}
      >
        <Button className={{ module: ["submit"] }} type="submit">
          Log in
        </Button>
        <Link to="/signup">Don't have an account? Register</Link>
      </Form>
    </>
  );
}
