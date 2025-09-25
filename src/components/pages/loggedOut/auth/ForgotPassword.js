import { useState } from "react";
import WithBackground from "../../../core/boilerplate/WithBackground";
import styled from "styled-components";
import MaterialInput from "../../../helperComponents/MaterialInput";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import InputCard from "../../../helperComponents/InputCard";
import { serverLine } from "../../../../controllers/network/serverLine";
import LoadingSection from "../../../helperComponents/LoadingSection";
import MessageBox from "../../../helperComponents/MessageBox";
import CustomButton from "../../../helperComponents/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import goTo from "../../../../controllers/goTo";
import AnimatedPage from "../../loggedIn/AnimatedPage";
import HozLogo from "../../../applicationUI/logo/HozLogo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10vh;
  align-items: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  align-items: center;
  padding-bottom: 30px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: flex-end;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 23px;
  color: var(--accent);
`;

const Medium = styled.div`
  /* font-weight: 900; */
  opacity: 0.4;
  font-size: 15px;
  text-align: center;
  color: var(--accent);
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
`;

const LargeLogo = styled.img`
  height: 5vw;
  width: auto;
  margin-top: 100px;
  @media (max-width: 900px) {
    height: 25vw;
    width: auto;
  }
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  let core = (
    <MaterialInput
      label={"Forgot Password"}
      value={email}
      onChange={extractEventValue(setEmail)}
    />
  );

  if (loading) core = <LoadingSection />;

  let submitButtonText = "Submit";
  let submitButtonAction = forgotPassword;

  if (done) {
    submitButtonText = null;
    submitButtonAction = null;
    core = <MessageBox>Check your email</MessageBox>;
  }

  return (
    <AnimatedPage>
      <WithBackground>
        <Container>
          <HozLogo />

          <InputCard
            title={"Forgot Password"}
            desc={"Password Reset Page"}
            submitButtonText={submitButtonText}
            onSubmit={submitButtonAction}
          >
            {core}
          </InputCard>

          <CustomButton
            icon={<FaArrowLeft />}
            // variant="minimal-underlined"
            onClick={goTo(-1)}
          ></CustomButton>
        </Container>
      </WithBackground>
    </AnimatedPage>
  );

  async function forgotPassword() {
    if (!email) return window.popupAlert("Please! enter your email");
    setLoading(true);

    try {
      await serverLine.post("/forgot-password", { email });
      setLoading(false);
      setDone(true);
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
