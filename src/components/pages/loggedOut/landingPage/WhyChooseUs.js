import styled from "styled-components";
import WhyChooseUsCard from "./WhyChooseUsCard";
import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import LoggedOutSectionTitle from "./LoggedOutSectionTitle";
import StylishUnderline from "../../../helperComponents/StylishUnderline";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 200px;
  align-items: space-between;
  margin-top: 100px;
  width: 100vw;

  @media (max-width: 900px) {
    margin-top: 30px;
  }
`;

const Img = styled.img`
  height: 1000px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-start;

  width: 100%;

  @media (max-width: 900px) {
    padding: 30px 40px;
  }
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;

  gap: 10px;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Underline = styled.div`
  height: 5px;
  border-radius: 5px;
  width: 62%;
  background-color: var(--accent);
`;

export default function WhyChooseUs({ containerRef }) {
  const targetRef = useRef(null);

  const animation = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ["0 1", "0.7 1"],
  });



  return (
    <Container ref={targetRef} id="why-choose-us">
      <Img src="/muscles1.jpg" />
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
            Lorem Ipsum
            </LoggedOutSectionTitle>
            <StylishUnderline />

            {/* <Description>
            Want to be a part of the most trending and exciting internships
            today? Check out our trending internship programs today.
          </Description> */}
          </Top>

          <List>
            <WhyChooseUsCard
              image="biceps.png"
              title={"Lorem Ipsum"}
                description={"Lorem Ipsum"}
        
            />
           
          </List>
        </motion.div>
      </Main>
      <Img src="/muscles2.jpg" />
    </Container>
  );
}
