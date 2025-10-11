import { useScroll, motion } from "framer-motion";
import { useContext, useRef } from "react";
import styled from "styled-components";
import ContactForm from "./ContactForm.js";
import InputCard from "../../../helperComponents/InputCard.js";
import Context from "../../../../Context.js";
import SquareDecoration from "./SquareDecoration.js";

let canvasDimension = 1000;

const Canvas = styled.canvas`
  margin-left: 0;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 150px;
  gap: 50px;

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
  justify-content: center;
  gap: 40px;
  align-items: center;

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

const Label = styled.h1`
  font-size: 35px;
  font-weight: 600;
  font-family: "Montserrat", serif;
  color: #030b23ff;
  text-align: center;
`;

export default function ContactUs() {
  const { isMobile } = useContext(Context);

  const targetRef = useRef(null);

  return (
    <Container>
      <Label>Contact Us</Label>

      <Row>
        <SquareDecoration />
        <ContactForm />
      </Row>
    </Container>
  );
}
