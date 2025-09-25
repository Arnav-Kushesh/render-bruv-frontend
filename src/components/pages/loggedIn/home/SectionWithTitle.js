import styled from "styled-components";
import CustomLabel from "../../../customUiForCs/CustomLabel";

const Container = styled.div`
  flex: 1;
  border: 1px solid var(--border);
  background: var(--gradientSurface);
  padding: 20px;
  border-radius: 10px;
  height: 700px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin: 0;
  color: var(--elementDim);
  font-size: 18px;
  opacity: 0.7;
`;

const List = styled.div``;

export default function SectionWithTitle({ title, children }) {
  return (
    <Container>
      <CustomLabel>{title}</CustomLabel>
      <List>{children}</List>
    </Container>
  );
}
