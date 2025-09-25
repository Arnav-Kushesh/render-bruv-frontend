import styled from "styled-components";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import LoggedOutSectionTitle from "./LoggedOutSectionTitle";
import StylishUnderline from "../../../helperComponents/StylishUnderline";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 150px;
  align-items: center;
  margin-top: 100px;
  padding-bottom: 80px;
  margin-bottom: 100px;
  width: 80vw;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 50px;
  }
`;

const Img = styled.img`
  width: 300px;
  height: auto;
  object-fit: contain;
  /* display: none; */
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-start;
  margin-top: 0;
  width: 62vw;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Description = styled.div`
  /* text-align: center; */
  opacity: 0.7;
`;

const Underline = styled.div`
  height: 5px;
  border-radius: 5px;
  /* margin-top: -20px; */
  width: 440px;
  margin-bottom: 30px;
  background-color: var(--accent);

  @media (max-width: 900px) {
    width: 350px;
  }
`;

export default function AboutUs({ containerRef }) {
  const targetRef = useRef(null);

  
  const animation = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ["0 1", "0.7 1"],
  });

  return (
    <Container ref={targetRef} id="about-us">
    
      <Main>
        <motion.div
          style={{
            scale: animation.scrollYProgress,
            display: "flex",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          <Top>
            <LoggedOutSectionTitle>
              About Us
            </LoggedOutSectionTitle>
            <StylishUnderline />
          </Top>
          <Description>
         Something about us
          </Description>
        </motion.div>
      </Main>
    </Container>
  );
}
