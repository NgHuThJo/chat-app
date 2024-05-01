// Third party
import { useNavigate } from "react-router-dom";
// Contexts
import { useApiContext } from "../../utility/context/ApiContext";
// Custom hooks
import useFetch from "../../utility/hooks/useFetch";
// Components
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
// Types
import { GeneralObject } from "../../utility/types/utilityType";

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
  const { apiBaseUrl } = useApiContext() as { apiBaseUrl: string };
  const { error, fetchData } = useFetch();
  const navigate = useNavigate();

  const onSubmit = async (
    formData: GeneralObject,
    event: React.FormEvent<SubmitEvent>
  ) => {
    event.preventDefault();

    const response = await fetchData(`${apiBaseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response) {
      navigate("/");
    }
  };

  return (
    <>
      <h1>Signup Form</h1>
      <Form
        method="post"
        className="signup"
        fields={inputFields}
        onSubmit={onSubmit}
      >
        <Button className="submit">Sign up</Button>
      </Form>
      {/* {error && <p>Username and password must not be empty.</p>} */}
    </>
  );
}

export default SignupForm;
