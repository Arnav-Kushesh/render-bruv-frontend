import styled from "styled-components";

const BubbleTextForCard = styled.div`
  background-color: var(--surface);
  border: 1px solid var(--borderDim);
  padding: 8px 16px;
  color: var(--element);
  font-weight: 600;
  font-size: 12px;
  border-radius: 15px;
  text-transform: capitalize;

  ${({ $highlight }) => {
    if ($highlight) {
      return `
        background-color: var(--accent);
        color: var(--accentAlt);
        `;
    }
  }}

  ${({ $makeRed }) => {
    if ($makeRed) {
      return ` 
        color: #d12000 !important;
      `;
    }
  }}


  ${({ $isButton }) => {
    if ($isButton) {
      return ` 
        cursor: pointer;
      &:hover {
    background: var(--surface);
  }`;
    }
  }}
`;

export default BubbleTextForCard;
