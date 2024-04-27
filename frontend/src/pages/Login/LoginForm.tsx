// Third party
import { Link, useNavigate } from "react-router-dom";
// Contexts
import { useApiContext } from "../../utility/context/ApiContext";
import { useLoginDispatchContext } from "../../utility/context/AuthContext";
// Custom hooks
import useFetch from "../../utility/hooks/useFetch";
// Components
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";

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
  const { apiBaseUrl } = useApiContext();
  const { setIsLoggedIn } = useLoginDispatchContext();
  const { error, fetchData } = useFetch();
  const navigate = useNavigate();
  const actionUrl = apiBaseUrl + "/api/login";

  const onSubmit = async (event, postData) => {
    event.preventDefault();

    const message = await fetchData(actionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (message) {
      localStorage.setItem("userLogged", JSON.stringify(true));
      setIsLoggedIn(true);
      console.log("User logged in");
      navigate("/");
    }
  };

  return (
    <>
      <h1>Login Form</h1>
      <Form
        action={actionUrl}
        method="post"
        className="form--login"
        inputFields={inputFields}
        onSubmit={onSubmit}
      >
        <Button className="button--submit" type="submit">
          Log in
        </Button>
      </Form>
      <Link to="/">Back to home</Link>
      {error && <p>Incorrect username or password.</p>}
    </>
  );
}

export default LoginForm;
