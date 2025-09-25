import { useContext, useState } from "react";
import OnboardingBoilerplate from "./OnboardingBoilerplate";
import LoadingSection from "../../../helperComponents/LoadingSection";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";
import CustomButton from "../../../helperComponents/CustomButton";
import MaterialInput from "../../../helperComponents/MaterialInput";

export default function VerifyEmail() {
  const { updateLoggedInUser, themeState } = useContext(Context);
  const [code, setCode] = useState();

  const [loading, setLoading] = useState(false);



  if (loading)
    return (
      <OnboardingBoilerplate>
        <LoadingSection />
      </OnboardingBoilerplate>
    );

  return (
    <OnboardingBoilerplate
      title={"Verify Email"}
      desc={"Check your email for verification code"}
      onSubmit={verifyEmail}
      submitButtonText={"Verify"}
    >
      <MaterialInput
        label={"Verification Code"}
        placeholder={"Type here"}
        type="password"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <CustomButton onClick={resend}>Resend</CustomButton>
    </OnboardingBoilerplate>
  );

  async function verifyEmail() {
    setLoading(true);

    try {
      await serverLine.post("/confirm-email", { code });
      await updateLoggedInUser();

      setLoading(false);
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }

  async function resend() {
    setLoading(true);

    try {
      await serverLine.post("/resend-email-for-confirmation");
      window.popupAlert("Sent");
      setLoading(false);
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
