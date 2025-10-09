import styled, { keyframes } from "styled-components";

const Container = styled.div`
  background-color: var(--borderDim);
  border-radius: 100px;
  width: 32vw;
  /* border: 1px solid var(--borderDim); */
`;
const ProgressBar = () => {
  return (
    <Container>
      <LoadingBar />
    </Container>
  );
};

export default ProgressBar;

const loadingAnimation = keyframes`
  0% { transform: scaleX(0); }
  5% { transform: scaleX(0.3); }
  100% { transform: scaleX(1); }
`;

const LoadingBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--accentGradient);
  border-radius: 20px;
  animation: ${loadingAnimation} 150s;
  transform-origin: left;
`;
