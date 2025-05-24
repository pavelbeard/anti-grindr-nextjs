import GreenderLogo from "@/components/auth/auth-greender-logo";
import AuthFormContainer from "@/components/auth/auth-form-container";
import Form from "./form";
import Links from "@/components/auth/auth-links";
import PrivacyPolicyTerms from "@/components/auth/auth-privacy-policy-terms";

export default function SignInPage() {
  return (
    <AuthFormContainer>
      <GreenderLogo />
      <Form />
      <PrivacyPolicyTerms />
      <Links />
    </AuthFormContainer>
  );
}
