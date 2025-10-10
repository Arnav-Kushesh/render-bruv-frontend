import styled, { keyframes } from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { SiMaildotru } from "react-icons/si";
import goTo from "../../../../controllers/goTo";
import loginWithGoogle from "../../../../controllers/auth/loginWithGoogle";
import { useContext, useState } from "react";
import LoadingSection from "../../../helperComponents/LoadingSection";

import { useScroll, useTransform, motion } from "framer-motion";
import Context from "../../../../Context";

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
  /* width: 300px; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 50px;
  padding: 20px 45px;
  font-size: 17px;
  font-weight: 800;
  background: linear-gradient(-90deg, #ffffffa2, #ffffffff);
  color: #204cca;
  cursor: pointer;
  border: none;
  box-shadow: 2px 6px 20px 0px #204cca;
  transition: all 0.25s ease-in-out;
  filter: brightness(1);

  svg {
    height: 25px;
    width: auto;
  }

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

// Secondary Button
export const SecondaryButton = styled(PrimaryButton)`
  background: #ffffff21;
  color: #ffffffff;
  border: 1px solid #ffffff58;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.05);
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

const loadingAnimation = keyframes`
    0% { transform: scale(3); }
    2% { transform: scale(1); }
    30% { transform: scale(1.7); }
    40% { transform: scale(1); }
    50% { transform: scale(1.9); }
    60% { transform: scale(1); }
    70% { transform: scale(2.5); }
    80% { transform: scale(1); }
    90% { transform: scale(2); }
    100% { transform: scale(1);}
`;

const HeroBackground = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${loadingAnimation} 200s;
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

const Layer = styled(motion.div)``;

export default function HeroSection() {
  const { mainScrollRef } = useContext(Context);
  const { scrollY } = useScroll({ container: mainScrollRef });

  // Define transforms for different layers
  const y1 = useTransform(scrollY, [0, 1000], [0, 100]); // Far layer
  const y2 = useTransform(scrollY, [0, 1000], [0, 200]); // Mid layer
  const y3 = useTransform(scrollY, [0, 1000], [0, 300]); // Front layer

  const [googleLoginLoading, setGoogleLoginLoading] = useState(false);

  if (googleLoginLoading) return <LoadingSection />;

  return (
    <Hero>
      <CenterContent>
        <Layer style={{ y: y1 }}>
          <Heading>Lightning Fast Render Farm For Blender</Heading>
        </Layer>

        <Layer style={{ y: y2 }}>
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
        </Layer>
        <Layer style={{ y: y3 }}>
          <Desc>Intuitive, Fast & Affordable </Desc>
        </Layer>
      </CenterContent>

      <InsetShadow />

      <HeroBackground src="/background/hero-background.jpg" />
    </Hero>
  );
}
