import { useScroll, motion } from "framer-motion";
import { useContext, useRef } from "react";
import styled from "styled-components";
import ContactForm from "./ContactForm.js";
import InputCard from "../../../helperComponents/InputCard.js";
import Context from "../../../../Context.js";

let canvasDimension = 1000;

const Canvas = styled.canvas`
  margin-left: 0;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;

  @media (max-width: 900px) {
    width: 90vw;
  }

  /* background-image: url("/dumbbells.jpg"); */
`;

let maxFrames = 40;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Img = styled.img`
  width: 300px;
  height: auto;
  object-fit: contain;

  @media (max-width: 900px) {
    display: none;
  }
`;

export default function ContactUs({ containerRef }) {
  const { isMobile } = useContext(Context);

  const targetRef = useRef(null);

  const textAnimation = useScroll({
    container: containerRef,
    target: targetRef,
    offset: ["0.1 1", "0.4 1"],
  });

  return (
    <Container
      id="contact-us"
      ref={targetRef}
      style={{
        display: "flex",
      }}
    >
      <motion.div
        style={{
          scale: textAnimation.scrollYProgress,
          width: "100%",
        }}
      >
        <Row>
          <Img src="/hero/2.jpg" />

          <InputCard
            style={{ width: isMobile ? "100%" : "600px", padding: "20px 5px" }}
            title={"Contact Us"}
          >
            <ContactForm />
          </InputCard>
        </Row>
      </motion.div>
    </Container>
  );
}
