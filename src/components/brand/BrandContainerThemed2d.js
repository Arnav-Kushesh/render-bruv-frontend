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
    width: 27vw;
    height: auto;
  }
`;

export default function BrandContainerThemed2d({ style }) {
  const { colorMode } = useContext(Context);
  window.goTo = goTo;

  return (
    <LogoImage
      // style={{ filter: colorMode == "DARK" && "invert(1)" }}
      src={
        colorMode == "DARK"
          ? "/logo/2d-full-logo-dark-mode.svg"
          : "/logo/2d-full-logo.svg"
      }
      // src=""
    />
  );
}
