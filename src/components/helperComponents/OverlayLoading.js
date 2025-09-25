import styled from "styled-components";
import BarLoader from "./BarLoader.js";
import LoadingSection from "./LoadingSection.js";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: absolute;
  background: var(--glassGradientHeader);
  backdrop-filter: blur(50px);
  border-radius: 10px;
  z-index: 1;
`;

export default function OverlayLoading() {
  return (
    <Main>
      <LoadingSection />
    </Main>
  );
}
