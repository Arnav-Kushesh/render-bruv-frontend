import { useState } from "react";
import styled from "styled-components";
import MaterialInput from "../../../helperComponents/MaterialInput";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import InputCard from "../../../helperComponents/InputCard";
import { serverLine } from "../../../../controllers/network/serverLine";
import LoadingSection from "../../../helperComponents/LoadingSection";
import CustomButton from "../../../helperComponents/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import goTo from "../../../../controllers/goTo";
import LoggedOutBoilerplate from "../LoggedOutBoilerplate";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10vh;
  align-items: center;

  @media (max-width: 900px) {
    width: 90vw;
  }
`;

export default function GenerateOTP() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  if (loading)
    return (
      <LoggedOutBoilerplate>
        <LoadingSection />
      </LoggedOutBoilerplate>
    );

  return (
    <LoggedOutBoilerplate>
      <Container>
        <InputCard
          title={"Login with OTP"}
          desc={"OTP will be sent to your email"}
          submitButtonText={"Generate"}
          onSubmit={generateOtp}
        >
          <MaterialInput
            label={"Email"}
            value={email}
            onChange={extractEventValue(setEmail)}
          />
        </InputCard>

        <CustomButton
          icon={<FaArrowLeft />}
          // variant="minimal-underlined"
          onClick={goTo(-1)}
        ></CustomButton>
      </Container>
    </LoggedOutBoilerplate>
  );

  async function generateOtp() {
    if (!email) return window.popupAlert("Email is required.");
    setLoading(true);

    try {
      await serverLine.post("/generate-otp", { email });
      setLoading(false);
      goTo(`/login-with-otp/?email=${email}`)();
      window.popupAlert("OTP has been sent.");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
