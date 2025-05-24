import GreenderLogo from "@/components/auth/auth-greender-logo";
import AuthFormContainer from "@/components/auth/auth-form-container";
import SignUpForm from "./form";
import Links from "@/components/auth/auth-links";

export default function SignUpPage() {
  return (
    <AuthFormContainer>
      <GreenderLogo />
      <SignUpForm />
      <Links />
    </AuthFormContainer>
  );
}
