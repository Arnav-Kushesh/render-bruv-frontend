import { useEffect, useState } from "react";
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
import getUrlQuery from "../../../../controllers/getUrlQuery";
import saveUserAuth from "../../../../controllers/auth/saveUserAuth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10vh;
  align-items: center;

  @media (max-width: 900px) {
    width: 90vw;
  }
`;

export default function LoginWithOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let theEmail = getUrlQuery("email");
    setEmail(theEmail);
  }, []);


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
          title={"Please! enter your otp"}
          desc={"Please! check your email for otp"}
          submitButtonText={"Login"}
          onSubmit={login}
        >
          <MaterialInput
            label={"Email"}
            value={email}
            onChange={extractEventValue(setEmail)}
          />
          <MaterialInput
            type={"password"}
            label={"OTP"}
            value={otp}
            onChange={extractEventValue(setOtp)}
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

  async function login() {
    if (!email) return window.popupAlert("Email is required");
    if (!otp) return window.popupAlert("OTP is required");

    setLoading(true);

    try {
      let authData = await serverLine.post("/login-with-otp", { email, otp });
      setLoading(false);
      saveUserAuth(authData);
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
