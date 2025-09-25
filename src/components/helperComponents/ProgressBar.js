import styled from "styled-components";

const Container = styled.div`
  width: 62vw;
  position: relative;
  background-color: var(--surface2);
  border-radius: 5px;
  height: 5px;

  @media (max-width: 1200px) {
    width: 62vw;
  }

  @media (max-width: 700px) {
    width: 90vw;
  }
`;

const Progress = styled.div`
  position: absolute;
  left: 0;
  transition: 0.2s ease-in-out;
  top: 0;
  width: 0;
  height: 100%;
  background-color: var(--element);
`;
// import ImageCapture from "image-capture";
export default function ProgressBar({ completed, total }) {
  let wid = (completed / total) * 100;
  return (
    <Container>
      <Progress style={{ width: wid + "%" }} />
    </Container>
  );
}
