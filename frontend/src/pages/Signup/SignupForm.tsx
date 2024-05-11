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
    error: "Your username is too short.",
  },
  {
    type: "password",
    id: "password",
    label: "Password:",
    name: "password",
    placeholder: "Your password...",
    error: "Your password is too short.",
  },
];

function SignupForm() {
  const { apiBaseUrl } = useApiContext() as { apiBaseUrl: string };
  const { fetchData } = useFetch();
  const navigate = useNavigate();

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: GeneralObject,
    setError?: React.Dispatch<React.SetStateAction<Boolean>>
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
      return;
    }

    setError && setError(true);
  };

  return (
    <>
      <h2>Signup Form</h2>
      <Form
        method="post"
        className="signup"
        fields={inputFields}
        onSubmit={onSubmit}
      >
        <Button className="submit">Sign up</Button>
      </Form>
    </>
  );
}

export default SignupForm;
