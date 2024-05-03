// Third party
import { Link } from "react-router-dom";
// Contexts
import {
  useAuthContext,
  useAuthDispatchContext,
} from "../../utility/context/AuthContext";
// Components
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
// Types

// Input fields
const inputFields = [
  {
    type: "text",
    id: "username",
    name: "username",
    label: "Username:",
    placeholder: "Your username...",
    error: "Your username does not satisfy requirements.",
  },
  {
    type: "password",
    id: "password",
    name: "password",
    label: "Password:",
    placeholder: "Your password...",
    error: "Your password does not satisfy requirements.",
  },
];

function LoginForm() {
  const { error } = useAuthContext();
  const { handleLogin } = useAuthDispatchContext();

  return (
    <>
      <h2>Login to your account</h2>
      <Form
        method="post"
        className="login"
        error={error}
        fields={inputFields}
        onSubmit={handleLogin}
      >
        <Button className="submit" type="submit">
          Log in
        </Button>
      </Form>
      <Link to="/signup">Don't have an account? Register</Link>
    </>
  );
}

export default LoginForm;
