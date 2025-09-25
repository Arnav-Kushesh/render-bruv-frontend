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
  width: 5vw;
  height: auto;

  @media (max-width: 900px) {
    width: 30vw;
    height: auto;
  }
`;

export default function BrandContainer() {
  const {} = useContext(Context);
  window.goTo = goTo;

  return <HozLogo />;
}
