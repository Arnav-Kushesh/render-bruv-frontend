import styled from "styled-components";

const InfoBox = styled.div`
  margin-top: 100px;
  padding: 25px;
  background: var(--gradientSurface);
  border: 1px solid var(--primaryColor);
  border-radius: 10px;
  width: 45vw;
  font-size: 21px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export default InfoBox;
