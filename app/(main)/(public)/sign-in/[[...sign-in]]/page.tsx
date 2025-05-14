import GreenderLogo from "@/components/public/greender-logo";
import AuthFormContainer from "@/components/public/auth-form-container";
import Form from "./form";

export default function SignInPage() {
  return (
    <AuthFormContainer>
      <GreenderLogo />
      <Form />
    </AuthFormContainer>
  );
}
