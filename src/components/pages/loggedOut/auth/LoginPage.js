import { useContext, useState } from "react";
import WithBackground from "../../../core/boilerplate/WithBackground";
import styled from "styled-components";
import MaterialInput from "../../../helperComponents/MaterialInput";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import InputCard from "../../../helperComponents/InputCard";
import CustomButton from "../../../helperComponents/CustomButton";
import LoadingSection from "../../../helperComponents/LoadingSection";
import { serverLine } from "../../../../controllers/network/serverLine";
import saveUserAuth from "../../../../controllers/auth/saveUserAuth";
import Context from "../../../../Context";
import AnimatedPage from "../../loggedIn/AnimatedPage";
import AnimatedPillTabs from "../landingPage/loggedOutHomeForApp/AnimatedPillTabs";
import HozLogo from "../../../applicationUI/logo/HozLogo";
import LoggedOutHeader from "../landingPage/LoggedOutHeader";

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  padding-top: 100px;
  gap: 50px;

  /* justify-content: space-between; */
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 50vw; */
  /* height: 100vh; */
  position: relative;
  justify-content: center;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: auto;
  justify-content: center;
  align-items: center;
  background: var(--surface3);
  border: 1px solid var(--borderDim);
  border-radius: 10px;
  margin-top: -50px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  align-items: center;
  /* padding-bottom: 30px; */
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  /* height: 220px; */
  /* background-color: red; */
  align-items: center;
`;

const AppUIContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 0;
  justify-content: center;
  align-items: center;
  padding-bottom: 40px;
`;
const ImageSectionApp = styled.div`
  border-radius: 15px;
  height: calc(100dvh - (var(--safe-area-inset-top) + 500px));
  /* height: auto; */
  /* flex: 1; */
  width: 100vw;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-height: 600px) {
    /* display: none; */
    opacity: 0;
  }
`;

const MobileAuthSection = styled.div`
  /* position: absolute; */
  /* bottom: 0; */
  /* box-shadow: 0 -10px 50px 50px #000; */
  padding: 0 20px;
  width: 100vw;
  background: var(--surface);
  height: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  /* flex: 1; */
  max-height: 500px;
  padding-top: 15px;
  border-top: 1px solid var(--borderDim);

  justify-content: flex-start;
  align-items: center;
  border-radius: 0 0 0;
  overflow: hidden;
  overflow-y: auto;
  /* padding-top: 50px; */
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  padding-top: 10px;
  background: linear-gradient(0deg, transparent, 20%, #000, #000);
  height: 80px;
`;

const ThemeSection = styled.div`
  position: absolute;
  bottom: 20px;
  left: 35%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

/* Hero Section */
const Hero = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 150px;
  /* text-align: center; */
  margin: 0 1rem;
  position: relative;
  margin-top: 30px;
`;

/* Illustration */
const Illustration = styled.div`
  position: relative;
  margin: 2rem 0;

  .guy {
    width: 250px;
    max-width: 100%;
  }

  .butterfly {
    display: none;
  }

  &.flipped {
    display: none;
  }

  @media (min-width: 1024px) {
    .guy {
      width: 320px;
    }

    &.flipped {
      display: block;
    }

    &.flipped img.guy {
      /* display: no; */
      transform: scaleX(-1);
    }

    /* &.flipped img.guy {
      transform: scaleX(-1);
    }

    &.flipped img.butterfly {
      transform: scaleX(-1);
    } */

    &.flipped img.butterfly {
      transform: translateX(250px) scaleX(-1);
    }

    .butterfly {
      display: block;
      width: 50px;
    }
  }
`;

export default function LoginPage({ initialType }) {
  const { isMobile } = useContext(Context);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("SIGNUP");

  let options = [
    { label: "Login", value: "LOGIN" },
    { label: "Signup", value: "SIGNUP" },
  ];

  let core = (
    <InputCard
      // title="Bienvenue"
      submitButtonText={"Submit"}
      onSubmit={submit}
    >
      <Form>
        <AnimatedPillTabs
          tabs={options}
          value={currentTab}
          onChange={setCurrentTab}
        />
        {getInputs()}
      </Form>
    </InputCard>
  );

  if (loading)
    core = (
      <InputCard>
        <LoadingSection />
      </InputCard>
    );

  if (isMobile) return getAppUI();

  return (
    <AnimatedPage>
      <WithBackground>
        <HorizontalContainer>
          <LeftSide>
            <LoggedOutHeader />
          </LeftSide>

          <Hero>{core}</Hero>
        </HorizontalContainer>
      </WithBackground>
    </AnimatedPage>
  );

  function getAppUI() {
    return (
      <AnimatedPage>
        <AppUIContainer>
          <WithBackground>
            <ImageSectionApp>
              <HozLogo />
            </ImageSectionApp>
            <MobileAuthSection>{core}</MobileAuthSection>
          </WithBackground>
        </AppUIContainer>
      </AnimatedPage>
    );
  }

  function submit() {
    if (currentTab == "LOGIN") {
      login();
    } else {
      signup();
    }
  }

  async function signup() {
    if (!email) return window.popupAlert("Please input the email");
    if (!password) return window.popupAlert("Please input the password");

    if (password !== confirmPassword)
      return window.popupAlert("Confirm password did not match");

    try {
      setLoading(true);
      let authData = await serverLine.post("/email-signup", {
        name,
        email,
        password,
      });

      setLoading(false);
      saveUserAuth(authData);
    } catch (e) {
      setLoading(false);
      window.popupAlert(e.message);
    }
  }

  async function login() {
    if (!email) return window.popupAlert("Please input the email");
    if (!password) return window.popupAlert("Please input the password");

    try {
      setLoading(true);
      let authData = await serverLine.post("/email-login", { email, password });

      setLoading(false);
      saveUserAuth(authData);
    } catch (e) {
      setLoading(false);
      window.popupAlert(e.message);
    }
  }

  function getInputs() {
    if (currentTab == "LOGIN") {
      return getLoginInputs();
    } else {
      return getSignupInputs();
    }
  }

  function getSignupInputs() {
    return (
      <Inputs>
        <MaterialInput
          label={"Name"}
          value={name}
          onChange={extractEventValue(setName)}
        />

        <MaterialInput
          label={"Email"}
          // placeholder={"Type Email Here"}
          value={email}
          onChange={extractEventValue(setEmail)}
        />

        <MaterialInput
          type="password"
          label={"Password"}
          // placeholder={"Type Password Here"}
          value={password}
          onChange={extractEventValue(setPassword)}
        />

        <MaterialInput
          type="password"
          label={"Confirm Password"}
          // placeholder={"Type Confirm Password Here"}
          value={confirmPassword}
          onChange={extractEventValue(setConfirmPassword)}
        />
      </Inputs>
    );
  }

  function getLoginInputs() {
    return (
      <Inputs>
        <MaterialInput
          label={"Email"}
          value={email}
          onChange={extractEventValue(setEmail)}
        />
        <MaterialInput
          type="password"
          label={"Password"}
          value={password}
          onChange={extractEventValue(setPassword)}
        />
        <CustomButton
          variant="minimal-underlined"
          customVariant="slightlyContained"
          href="/generate-otp"
        >
          Forgot Password
        </CustomButton>
      </Inputs>
    );
  }
}
