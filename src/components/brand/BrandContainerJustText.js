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

const Container = styled.div`
  padding: 0 25px;
`;

const Line1 = styled.div`
  font-size: 21px;
  font-weight: 900;
`;

const Line2 = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const LogoImage = styled.img`
  height: 70px;
  width: auto;

  @media (max-width: 900px) {
    width: 62vw;
  }
`;

export default function BrandContainerJustText({ style }) {
  const { themeState } = useContext(Context);
  window.goTo = goTo;

  return (
    <Container>
      <LogoImage style={style} src="/logo/full-logov2.png" />
    </Container>
  );
}
