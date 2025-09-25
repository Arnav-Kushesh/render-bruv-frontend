import styled from "styled-components";

import { useScroll, motion } from "framer-motion";
import { useRef } from "react";
import AlumniCompanyCard from "./AlumniCompanyCard";

import {
  FaAmazon,
  FaFacebook,
  FaGoogle,
  FaMeta,
  FaMicrosoft,
  FaUnity,
} from "react-icons/fa6";
import {
  BsApple,
  BsGitlab,
  BsReddit,
  BsSlack,
  BsSnapchat,
  BsTwitch,
  BsTwitter,
} from "react-icons/bs";
import { GrGithub } from "react-icons/gr";
import { PiPinterestLogo } from "react-icons/pi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  margin-top: 100px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 45px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  color: var(--accentDim);
`;

const Description = styled.div`
  text-align: center;
  opacity: 0.7;
  width: 40vw;
  line-height: 1.7;
  font-family: urb;
`;

const List = styled.div`
  display: grid;
  width: auto;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 30px;
`;

export default function AlumniWorkAt({ containerRef }) {
  const targetRef = useRef(null);

  const animation = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ["0 1", "0.7 1"],
  });

  const animationCards = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ["0.3 1", "0.7 1"],
  });

  return (
    <Container ref={targetRef}>
      <motion.div style={{ scale: animation.scrollYProgress }}>
        <Top>
          <Title>Our Alumni Work At</Title>
          <Description>
            Our alumni are already making meaningful contributions in their
            fields. They are working in prominent industries and helping to
            shape the future.
          </Description>
        </Top>
      </motion.div>

      <motion.div style={{ scale: animationCards.scrollYProgress }}>
        <List>
          <AlumniCompanyCard>
            <FaGoogle />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <FaUnity />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <FaMicrosoft />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <FaMeta />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <FaAmazon />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <BsGitlab />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <BsApple />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <GrGithub />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <BsReddit />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <BsTwitter />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <BsSlack />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <BsSnapchat />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <BsTwitch />
          </AlumniCompanyCard>
          <AlumniCompanyCard>
            <PiPinterestLogo />
          </AlumniCompanyCard>
        </List>
      </motion.div>
    </Container>
  );
}
