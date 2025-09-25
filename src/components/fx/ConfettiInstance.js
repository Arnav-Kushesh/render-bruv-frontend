import styled from "styled-components";

import ConfettiExplosion from "react-confetti-explosion";

const ConfettiPos = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */
`;

let confettiOptions = {
  force: 0.2,
  duration: 3200,
  particleCount: 3,
  width: 1300,
  zIndex: 100,
};

export default function ConfettiInstance() {
  return (
    <ConfettiPos>
      <ConfettiExplosion {...confettiOptions} />
      <ConfettiExplosion {...confettiOptions} />
      <ConfettiExplosion {...confettiOptions} />
      {/* <ConfettiExplosion {...confettiOptions} /> */}
      {/* <ConfettiExplosion {...confettiOptions} /> */}
      {/* <ConfettiExplosion {...confettiOptions} /> */}
    </ConfettiPos>
  );
}
