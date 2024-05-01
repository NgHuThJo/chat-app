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
    placeholder: "Your username...",
  },
  {
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Your password...",
  },
];

function LoginForm() {
  const { error } = useAuthContext();
  const { handleLogin } = useAuthDispatchContext();

  return (
    <>
      <h1>Login to your account</h1>
      <Form
        method="post"
        className="login"
        fields={inputFields}
        onSubmit={handleLogin}
      >
        <Button className="submit" type="submit">
          Log in
        </Button>
      </Form>
      <Link to="/signup">Don't have an account? Register</Link>
      {/* {error && <p>Incorrect username or password.</p>} */}
    </>
  );
}

export default LoginForm;
