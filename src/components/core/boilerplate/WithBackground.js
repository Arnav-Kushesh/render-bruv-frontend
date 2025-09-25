import styled from "styled-components";

import { useContext } from "react";
import Context from "../../../Context.js";
import CustomBlurBackground from "./CustomBlurBackground.js";

const Container = styled.div`
  height: 100dvh;
  height: 100dvh;
  width: 100vw;
  background-color: var(--mainBackground);
  height: calc(100dvh - var(--safe-area-inset-top));
  width: 100vw;
  /* backdrop-filter: blur(100px); */
`;

const Main = styled.div`
  height: 100dvh;
  height: 100dvh;
  width: 100vw;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100dvh - var(--safe-area-inset-top));
  /* background-color: var(--background); */
  /* overflow-y: scroll; */
  /* backdrop-filter: blur(50px); */
`;

export default function WithBackground({ children }) {
  const { loggedInUserId, colorMode } = useContext(Context);

  return (
    <Container>
      <Main>{children}</Main>
      {/* {backgroundImage ? <Background src={backgroundImage} /> : null} */}
      {/* <CustomBlurBackground /> */}
    </Container>
  );
}
