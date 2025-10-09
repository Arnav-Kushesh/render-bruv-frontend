import styled from "styled-components";

const UploadFileButton = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border: 2px solid var(--borderIntense);
  border-radius: 50px;
  padding: 17px 5px;
  font-size: 15px;
  font-weight: 700;

  cursor: pointer;
  transition: 0.2s;
  width: 100%;
  box-shadow: var(--shadow);

  color: var(--element);

  /* border: 2px solid var(--accentDim); */
  /* overflow: hidden; */
  background: var(--activeSurface);
  transition: all 0.25s ease-in-out;
  filter: brightness(1.1);

  &:hover {
    transform: scale(0.95);
    filter: brightness(1.2);
  }

  svg {
    font-size: 1.3rem;
  }
`;

export default UploadFileButton;
