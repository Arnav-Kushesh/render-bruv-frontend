import styled, { keyframes } from "styled-components";
import { FaGoogle } from "react-icons/fa";
import { SiMaildotru } from "react-icons/si";
import goTo from "../../../../controllers/goTo";
import loginWithGoogle from "../../../../controllers/auth/loginWithGoogle";
import { useContext, useState } from "react";
import LoadingSection from "../../../helperComponents/LoadingSection";

import { useScroll, useTransform, motion } from "framer-motion";
import Context from "../../../../Context";

const PageWrapper = styled.div`
  /* background: linear-gradient(180deg, #f6f6ff 0%, #eae8ff 100%); */
  color: #2a2752;
  font-family: "Inter", sans-serif;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  padding: 60px 40px;
  gap: 100px;
  margin-top: 0px;
`;

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
  /* text-align: center; */

  @media (max-width: 900px) {
    font-size: 35px;
    font-weight: 900;
    margin: 0 0;
  }
`;

const DescLabel = styled.h1`
  color: #eeeeee8b;
  font-size: 30px;
  font-weight: 500;
  margin: 0;
  margin-bottom: 10px;
  /* margin-top: 20px; */

  @media (max-width: 900px) {
    margin: 0;
    padding: 0;
    font-size: 15px;
    font-weight: 500;
  }
`;

const Desc = styled.h1`
  color: #eeeeee8b;
  font-size: 30px;
  text-decoration: underline;
  font-weight: 500;
  cursor: pointer;
  margin: 0;
  /* margin-top: 20px; */

  &:hover {
    color: #ffffffd9;
  }

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
  align-items: flex-start;
  left: 0;
  top: 0;
  padding: 70px;
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

const Header = styled.h1`
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 0;

  color: #2a2752;
`;

const SubText = styled.p`
  color: #5b567f;
  font-size: 1rem;
  /* text-align: center; */
  max-width: 550px;
  line-height: 1.6;
  margin-bottom: 60px;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const DescList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function AboutUs() {
  const { mainScrollRef } = useContext(Context);
  const { scrollY } = useScroll({ container: mainScrollRef });

  const y1 = useTransform(scrollY, [1500, 2700], [0, 1]);

  return (
    <Layer id="about-us-section" style={{ scale: y1 }}>
      <PageWrapper>
        <HeaderSection>
          <Header>About Us</Header>
          <SubText>We are a small team based in India.</SubText>
        </HeaderSection>
        <Hero>
          <CenterContent>
            <Layer style={{ y: 0 }}>
              <Heading>
                We are a small team that works remotely from different corners
                of India.{" "}
              </Heading>
            </Layer>
            <DescList>
              <DescLabel>Founders</DescLabel>
              <Desc onClick={goTo("https://x.com/rishabhdev2700")}>
                Rishabh Bahukhandi - Devops{" "}
              </Desc>

              <Desc
                onClick={goTo("https://www.instagram.com/flutter.fury/?hl=en")}
              >
                Nikhil Kumar - Operations{" "}
              </Desc>
              <Desc onClick={goTo("https://x.com/arnav_kushesh")}>
                Arnav Kushesh - Design{" "}
              </Desc>
            </DescList>
          </CenterContent>

          <InsetShadow />

          <HeroBackground src="/background/hero-background.jpg" />
        </Hero>
      </PageWrapper>
    </Layer>
  );
}
