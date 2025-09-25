import styled from "styled-components";

const CustomPrimaryButtonColorful = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  border: 2px solid #000;
  border-radius: 50px;
  padding: 17px 5px;
  font-size: 15px;
  font-weight: 700;
  background: #fff;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.05);

  border: none;
  color: var(--elementAlt);

  /* border: 2px solid var(--accentDim); */
  /* overflow: hidden; */
  background: linear-gradient(350deg, #2242b6ff, #47aaf5);
  box-shadow: var(--primaryButtonShadow);
  transition: all 0.25s ease-in-out;
  filter: brightness(1.1);

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2);
    /* background: linear-gradient(350deg, #1e3ca9ff, #6cbfffff); */
  }

  svg {
    font-size: 1.3rem;
  }
`;

export default CustomPrimaryButtonColorful;
