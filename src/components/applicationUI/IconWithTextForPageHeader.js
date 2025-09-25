import styled from "styled-components";

const IconWithTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  color: var(--elementDim);
  ${({ $isButton }) => {
    if ($isButton) {
      return `cursor:pointer;
      
      &:hover{
        text-decoration: underline;
      }
      
      `;
    }
  }}
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
`;

const IconText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;
export default function IconWithTextForPageHeader({ icon, children, onClick }) {
  return (
    <IconWithTextContainer $isButton={onClick ? true : false} onClick={onClick}>
      <Icon>{icon}</Icon>
      <IconText>{children}</IconText>
    </IconWithTextContainer>
  );
}
