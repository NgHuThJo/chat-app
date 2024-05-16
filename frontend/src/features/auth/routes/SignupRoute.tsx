import { AuthLayout } from "@/components/layouts/auth/AuthLayout";
import { SignupForm } from "../components/signup/SignupForm";

export function SignupRoute() {
  return (
    <AuthLayout>
      <SignupForm></SignupForm>
    </AuthLayout>
  );
}
