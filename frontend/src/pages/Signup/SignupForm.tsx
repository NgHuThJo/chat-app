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
    label: "Username:",
    name: "username",
    placeholder: "Your username...",
    error: "Your username does not satisfy requirements.",
  },
  {
    type: "password",
    id: "password",
    label: "Password:",
    name: "password",
    placeholder: "Your password...",
    error: "Your password does not satisfy requirements.",
  },
];

function SignupForm() {
  const { apiBaseUrl } = useApiContext() as { apiBaseUrl: string };
  const { error, fetchData } = useFetch();
  const navigate = useNavigate();

  const onSubmit = async (
    event: React.FormEvent<SubmitEvent>,
    formData: GeneralObject
  ) => {
    // event.preventDefault();

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

    navigate("/");
  };

  return (
    <>
      <h2>Signup Form</h2>
      <Form
        method="post"
        className="signup"
        error={error}
        fields={inputFields}
        onSubmit={onSubmit}
      >
        <Button className="submit">Sign up</Button>
      </Form>
    </>
  );
}

export default SignupForm;
