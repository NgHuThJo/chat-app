import { AuthLayout } from "@/components/layouts/auth/AuthLayout";
import { LoginForm } from "../components/login/LoginForm";

export function LoginRoute() {
  return (
    <AuthLayout>
      <LoginForm></LoginForm>
    </AuthLayout>
  );
}
