import styled from "styled-components";
import { useScroll, motion } from "framer-motion";
import { useContext, useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import LoggedOutSectionTitle from "./LoggedOutSectionTitle";
import Context from "../../../../Context";
import StylishUnderline from "../../../helperComponents/StylishUnderline";

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
  align-items: center;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 45px;
  text-align: center;
  font-family: "Futur", sans-serif;
  color: var(--accentDim);
`;

const Description = styled.div`
  text-align: center;
  opacity: 0.7;
`;

const List = styled.div`
  display: grid;
  width: auto;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Underline = styled.div`
  height: 5px;
  border-radius: 5px;
  width: 100%;
  background-color: var(--accent);
`;

export default function Testimonials({ containerRef }) {
  const { isMobile } = useContext(Context);

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
    <Container ref={targetRef} id="testimonials">
      <motion.div style={{ scale: isMobile ? 1 : animation.scrollYProgress }}>
        <Top>
          <LoggedOutSectionTitle>Lorem Ipsum</LoggedOutSectionTitle>
          <StylishUnderline />
          <Description>Lorem Ipsum</Description>
        </Top>
      </motion.div>

      <motion.div
        style={{ scale: isMobile ? 1 : animationCards.scrollYProgress }}
      >
        <List>
          <TestimonialCard
            image="https://picsum.photos/200"
            name="Maya Shivani, Capgemini"
          >
            Data Science - we all have heard about it enough to know that this
            is one of the leading programmes. It is a vast domain which I had
            the ‘opportunity to learn from ACMEGRADE. It has not only benefited
            me with the skills for developing algorithms and understanding data
            but also gave me an early start into making this my expertise. Today
            | prepare for my masters by having known what I want to do with my
            life and I thank ACMEGRADE for that.
          </TestimonialCard>
          <TestimonialCard
            image="https://picsum.photos/200"
            name="Maya Shivani, Capgemini"
          >
            Data Science - we all have heard about it enough to know that this
            is one of the leading programmes. It is a vast domain which I had
            the ‘opportunity to learn from ACMEGRADE. It has not only benefited
            me with the skills for developing algorithms and understanding data
            but also gave me an early start into making this my expertise. Today
            | prepare for my masters by having known what I want to do with my
            life and I thank ACMEGRADE for that.
          </TestimonialCard>
          <TestimonialCard
            image="https://picsum.photos/200"
            name="Maya Shivani, Capgemini"
          >
            Data Science - we all have heard about it enough to know that this
            is one of the leading programmes. It is a vast domain which I had
            the ‘opportunity to learn from ACMEGRADE. It has not only benefited
            me with the skills for developing algorithms and understanding data
            but also gave me an early start into making this my expertise. Today
            | prepare for my masters by having known what I want to do with my
            life and I thank ACMEGRADE for that.
          </TestimonialCard>
          <TestimonialCard
            image="https://picsum.photos/200"
            name="Maya Shivani, Capgemini"
          >
            Data Science - we all have heard about it enough to know that this
            is one of the leading programmes. It is a vast domain which I had
            the ‘opportunity to learn from ACMEGRADE. It has not only benefited
            me with the skills for developing algorithms and understanding data
            but also gave me an early start into making this my expertise. Today
            | prepare for my masters by having known what I want to do with my
            life and I thank ACMEGRADE for that.
          </TestimonialCard>
          <TestimonialCard
            image="https://picsum.photos/200"
            name="Maya Shivani, Capgemini"
          >
            Data Science - we all have heard about it enough to know that this
            is one of the leading programmes. It is a vast domain which I had
            the ‘opportunity to learn from ACMEGRADE. It has not only benefited
            me with the skills for developing algorithms and understanding data
            but also gave me an early start into making this my expertise. Today
            | prepare for my masters by having known what I want to do with my
            life and I thank ACMEGRADE for that.
          </TestimonialCard>
          <TestimonialCard
            image="https://picsum.photos/200"
            name="Maya Shivani, Capgemini"
          >
            Data Science - we all have heard about it enough to know that this
            is one of the leading programmes. It is a vast domain which I had
            the ‘opportunity to learn from ACMEGRADE. It has not only benefited
            me with the skills for developing algorithms and understanding data
            but also gave me an early start into making this my expertise. Today
            | prepare for my masters by having known what I want to do with my
            life and I thank ACMEGRADE for that.
          </TestimonialCard>
        </List>
      </motion.div>
    </Container>
  );
}
