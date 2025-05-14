import GreenderLogo from "@/components/public/greender-logo";
import AuthFormContainer from "@/components/public/auth-form-container";
import SignUpForm from "./form";

export default function SignUpPage() {
  return (
    <AuthFormContainer>
      <GreenderLogo />
      <SignUpForm />
    </AuthFormContainer>
  );
}
