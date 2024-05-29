// React
import { useNavigate } from "react-router-dom";
// Custom hooks
// Components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// APIs
import { createSignup } from "../../api/signup";
// Types
import { GenericObject } from "@/types";

// Input fields
const inputFields = [
  {
    type: "text",
    id: "username",
    label: "Username:",
    name: "username",
    placeholder: "Your username...",
    errorMessage: "Your username is too short.",
  },
  {
    type: "password",
    id: "password",
    label: "Password:",
    name: "password",
    placeholder: "Your password...",
    errorMessage: "Your password is too short.",
  },
];

export function SignupForm() {
  const navigate = useNavigate();

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    formData: GenericObject,
    setError?: React.Dispatch<React.SetStateAction<Boolean>>
  ) => {
    event.preventDefault();

    const response = await createSignup(formData);

    if (response) {
      return navigate("/");
    }

    setError && setError(true);
  };

  return (
    <>
      <h2>Signup Form</h2>
      <Form
        className={{ module: ["default"] }}
        fields={inputFields}
        onSubmit={onSubmit}
      >
        <Button className={{ module: ["submit"] }} type="submit">
          Sign up
        </Button>
      </Form>
    </>
  );
}
