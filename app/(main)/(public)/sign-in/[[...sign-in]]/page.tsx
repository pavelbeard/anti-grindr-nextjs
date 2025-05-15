import GreenderLogo from "@/components/public/greender-logo";
import AuthFormContainer from "@/components/public/auth-form-container";
import Form from "./form";
import Links from "@/components/public/links";
import PrivacyPolicyTerms from "@/components/public/privacy-policy-terms";

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
