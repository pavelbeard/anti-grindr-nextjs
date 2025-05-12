import GreenderLogo from "@/app/components/public/greender-logo";
import AuthFormContainer from "@/app/components/public/auth-form-container";
import Form from "./form";

export default function SignInPage() {
  return (
    <AuthFormContainer>
      <GreenderLogo />
      <Form />
    </AuthFormContainer>
  );
}
