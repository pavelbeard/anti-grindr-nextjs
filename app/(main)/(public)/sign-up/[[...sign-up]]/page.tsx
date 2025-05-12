import GreenderLogo from "@/app/components/public/greender-logo";
import AuthFormContainer from "@/app/components/public/auth-form-container";
import SignUpForm from "./form";

export default function SignUpPage() {
  return (
    <AuthFormContainer>
      <GreenderLogo />
      <SignUpForm />
    </AuthFormContainer>
  );
}
