import styled from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { SiMaildotru } from "react-icons/si";
import goTo from "../../../../controllers/goTo";
import loginWithGoogle from "../../../../controllers/auth/loginWithGoogle";
import { useState } from "react";
import LoadingSection from "../../../helperComponents/LoadingSection";

/* Hero Section */
const Hero = styled.section`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  height: calc(100vh - 130px);
  justify-content: space-between;
  position: relative;
  border-radius: 35px;
  overflow: hidden;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    /* text-align: center; */
    width: 100%;
    height: auto;
  }
`;

export const ButtonGroup = styled.div`
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  display: flex;

  @media (max-width: 900px) {
    margin-top: 30px;

    flex-direction: column;
    gap: 30px;
    width: 100%;
  }
`;

// Primary Button
export const PrimaryButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 50px;
  padding: 20px 5px;
  font-size: 1rem;
  font-weight: 800;
  background: linear-gradient(-90deg, #ffffffa2, #ffffffff);
  color: #204cca;
  cursor: pointer;
  border: none;
  box-shadow: 2px 6px 20px 0px #204cca;
  transition: all 0.25s ease-in-out;
  filter: brightness(1);

  svg {
    font-size: 1.3rem;
  }

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }

  @media (min-width: 900px) {
    width: 300px;
  }
`;

// Secondary Button
export const SecondaryButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border-radius: 50px;
  padding: 20px 5px;
  font-size: 1rem;
  font-weight: 800;
  background: #ffffff21;
  color: #ffffffff;
  border: 1px solid #ffffff58;
  cursor: pointer;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.05);
  transition: 0.2s;

  svg {
    font-size: 1.3rem;
  }

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 900px) {
    width: 300px;
  }
`;

const Heading = styled.h1`
  width: 60vw;
  font-size: 4.5vw;
  font-weight: 800;
  font-family: "Quicksand", sans-serif;
  color: #ffffffff;
  text-align: center;

  @media (max-width: 900px) {
    font-size: 35px;
    font-weight: 900;
    margin: 0 0;
  }
`;

const Desc = styled.h1`
  color: #eeeeee8b;
  font-size: 30px;
  font-weight: 500;
  margin-top: 170px;

  @media (max-width: 900px) {
    margin: 0;
    padding: 0;
    font-size: 15px;
    font-weight: 500;
  }
`;

const CenterContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 15px;
  align-items: center;
  left: 0;
  top: 120px;
  z-index: 5;
  width: 100%;
`;

const HeroBackground = styled.img`
  width: 100%;
  height: 100%;
`;

const InsetShadow = styled.div`
  box-shadow: inset 0px 20px 40px 3px rgb(1 20 172 / 88%);
  border-radius: 15px;
  overflow: hidden;
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function HeroSection() {
  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);

  if (googleLoginLoading) return <LoadingSection />;

  return (
    <Hero>
      <CenterContent>
        <Heading>Lightning Fast Render Farm For Blender</Heading>

        <ButtonGroup>
          <PrimaryButton
            className="primary"
            onClick={() => {
              loginWithGoogle(setGoogleLoginLoading);
            }}
          >
            <FaGoogle /> Continue With Google
          </PrimaryButton>
          <SecondaryButton className="secondary" onClick={goTo("/auth")}>
            <SiMaildotru />
            Continue With Email
          </SecondaryButton>
        </ButtonGroup>
        <Desc>Fast, Affordable & Intuitive</Desc>
      </CenterContent>

      <InsetShadow />
      <HeroBackground src="/background/hero-background.jpg" />
    </Hero>
  );
}
