import styled from "styled-components";

import { useContext } from "react";
import Context from "../../../Context.js";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  opacity: 0.5;
  /* filter: blur(100px); */
  /* background-color: red; */
`;

const Circle = styled.div`
  position: absolute;
  background: var(--blurryBackground);
  height: 30vw;
  width: 30vw;
  position: absolute;
  top: 3vw;
  border-radius: 1000px;
  left: 10vw;
`;

const PseudoContainerForFirefox = styled.div`
  filter: blur(100px);
  height: 100vh;
  width: 100vw;
  position: absolute;
`;

export default function CustomBlurBackground() {
  let itemBlur = "blur(200px)";

  let isFirefox = firefoxCheck();
  if (isFirefox) itemBlur = "blur(100px)";

  if (!isFirefox) {
    return (
      <Container>
        <Circle style={{ filter: itemBlur }} />
        <Circle
          style={{
            top: "unset",
            left: "unset",
            right: "5vw",
            bottom: "10vw",
            filter: itemBlur,
          }}
        />
      </Container>
    );
  }

  //PseudoContainerForFirefox is added to add layered blur
  //because firefox limits blur to 100px

  return (
    <Container>
      <PseudoContainerForFirefox>
        <PseudoContainerForFirefox>
          <PseudoContainerForFirefox>
            <PseudoContainerForFirefox>
              <PseudoContainerForFirefox>
                <PseudoContainerForFirefox>
                  <PseudoContainerForFirefox>
                    <Circle style={{ filter: itemBlur }} />
                    <Circle
                      style={{
                        top: "unset",
                        left: "unset",
                        right: "5vw",
                        bottom: "10vw",
                        filter: itemBlur,
                      }}
                    />
                  </PseudoContainerForFirefox>
                </PseudoContainerForFirefox>
              </PseudoContainerForFirefox>
            </PseudoContainerForFirefox>
          </PseudoContainerForFirefox>
        </PseudoContainerForFirefox>
      </PseudoContainerForFirefox>
    </Container>
  );

  function firefoxCheck() {
    return navigator.userAgent.toLowerCase().includes("firefox");
  }
}
