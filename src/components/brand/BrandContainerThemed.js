import styled from "styled-components";

import goTo from "../../controllers/goTo.js";
import { useContext } from "react";
import Context from "../../Context.js";

const BrandContainerMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  gap: 10px;

  /* animation: centerScaleReveal 0.4s ease-in; */
`;

const LogoImg = styled.img`
  width: auto;
  height: 50px;

  @media (max-width: 900px) {
    width: 30vw;
    height: auto;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Container = styled.div`
  /* padding: 0 25px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

const Line1 = styled.div`
  font-size: 15px;
  font-family: "Rubik", sans-serif;
  font-weight: 750;
  /* color: var(--headerAccent); */
  color: var(--element);
`;

const Line2 = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const LogoImage = styled.img`
  height: 55px;
  width: auto;
  filter: brightness(1.3);

  @media (max-width: 900px) {
    width: 62vw;
  }
`;

export default function BrandContainerThemed({ style }) {
  const { themeState } = useContext(Context);
  window.goTo = goTo;

  return (
    <Container style={style}>
      <LogoImage src="/logo/just-icon.png" />
      <Text>
        <Line1>Render</Line1>
        <Line1>Bruv</Line1>
      </Text>
    </Container>
  );
}
