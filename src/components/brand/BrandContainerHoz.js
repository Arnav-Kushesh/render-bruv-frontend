import styled from "styled-components";

import goTo from "../../controllers/goTo.js";
import { useContext } from "react";
import Context from "../../Context.js";
import HozLogo from "../applicationUI/logo/HozLogo.js";

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

export default function BrandContainerHoz() {
  const { themeState } = useContext(Context);
  window.goTo = goTo;

  return <HozLogo style={{ height: "50px", width: "auto" }} />;
}
