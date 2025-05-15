import GreenderLogo from "@/components/public/greender-logo";
import AuthFormContainer from "@/components/public/auth-form-container";
import SignUpForm from "./form";
import Links from "@/components/public/links";

export default function SignUpPage() {
  return (
    <AuthFormContainer>
      <GreenderLogo />
      <SignUpForm />
      <Links />
    </AuthFormContainer>
  );
}
