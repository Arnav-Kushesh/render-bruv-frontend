import styled from "styled-components";
import limitStringLength from "../../controllers/utils/limitStringLength";

const IconWithTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  font-size: 15px;
  align-items: center;
`;

const IconText = styled.div`
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 600;
`;

export default function IconWithTextForCard({
  icon,
  children,
  onClick,
  highlight,
}) {
  return (
    <IconWithTextContainer $isButton={onClick ? true : false} onClick={onClick}>
      {icon ? <Icon>{icon}</Icon> : null}
      <IconText>{limitStringLength(children, 30)}</IconText>
    </IconWithTextContainer>
  );
}
