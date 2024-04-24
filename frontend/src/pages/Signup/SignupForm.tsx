// Third party
import { Link, useNavigate } from "react-router-dom";
// Contexts
import { useApiContext } from "../../utility/context/ApiContext";
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

function SignupForm() {
  const { apiBaseUrl } = useApiContext();
  const { error, fetchData } = useFetch();
  const navigate = useNavigate();
  const actionUrl = apiBaseUrl + "/api/signup";

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
      navigate("/");
    }
  };

  return (
    <>
      <h1>Signup Form</h1>
      <Form
        action={actionUrl}
        method="post"
        className="form--signup"
        inputFields={inputFields}
        onSubmit={onSubmit}
      >
        <Button className="button--submit" type="submit">
          Sign up
        </Button>
      </Form>
      <Link to="/">Back to home</Link>
      {error && <p>Username and password must not be empty.</p>}
    </>
  );
}

export default SignupForm;
