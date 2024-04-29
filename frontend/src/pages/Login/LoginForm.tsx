// Third party
import { Link } from "react-router-dom";
// Contexts
import { useAuthDispatchContext } from "../../utility/context/AuthContext";
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
  const { handleLogin } = useAuthDispatchContext();

  return (
    <>
      <h1>Login Form</h1>
      <Form
        method="post"
        className="form--login"
        fields={inputFields}
        onSubmit={handleLogin}
      >
        <Button className="button--submit" type="submit">
          Log in
        </Button>
      </Form>
      <Link to="/">Back to home</Link>
      {/* {error && <p>Incorrect username or password.</p>} */}
    </>
  );
}

export default LoginForm;
