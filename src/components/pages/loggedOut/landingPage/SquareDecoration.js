import styled, { keyframes } from "styled-components";
import { FaGoogle, FaRegHeart } from "react-icons/fa";
import { SiBlender, SiMaildotru } from "react-icons/si";
import goTo from "../../../../controllers/goTo";
import loginWithGoogle from "../../../../controllers/auth/loginWithGoogle";
import { useContext, useState } from "react";
import LoadingSection from "../../../helperComponents/LoadingSection";
import { RiEmotionHappyLine } from "react-icons/ri";
import { PiButterfly } from "react-icons/pi";
import { useScroll, useTransform, motion } from "framer-motion";
import Context from "../../../../Context";

/* Hero Section */
const Hero = styled.section`
  display: flex;
  width: 700px;
  height: 700px;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
  position: relative;
  border-radius: 30px;
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
  width: 90%;
  font-size: 50px;
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
  flex-direction: row;
  position: absolute;
  gap: 40px;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100%;
  padding: 200px 50px;
  z-index: 5;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const loadingAnimation = keyframes`
    0% { transform: scale(3.5); }
    50% { transform: scale(1); }
    100% { transform: scale(3.5);}
`;

const HeroBackground = styled.img`
  width: 100%;
  height: 100%;
  filter: blur(5px);
  object-fit: cover;
  animation: ${loadingAnimation} 20s ease-in-out infinite;
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

export default function SquareDecoration() {
  const { mainScrollRef } = useContext(Context);
  const { scrollY } = useScroll({ container: mainScrollRef });

  // Define transforms for different layers
  const y1 = useTransform(scrollY, [400, 1000], [-500, 0]); // Far layer

  return (
    <Layer style={{ x: y1 }}>
      <Hero>
        <CenterContent>
          <Heading>
            <SiBlender />
          </Heading>
          <Heading>
            <PiButterfly />
          </Heading>
          <Heading>
            <SiBlender />
          </Heading>

          <Heading>
            <SiBlender />
          </Heading>
          <Heading>
            <FaRegHeart />
          </Heading>
          <Heading>
            <SiBlender />
          </Heading>
        </CenterContent>

        <InsetShadow />
        <HeroBackground src="/background/hero-background2.jpg" />
      </Hero>
    </Layer>
  );
}
