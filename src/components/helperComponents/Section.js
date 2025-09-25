import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: var(--accent);
  opacity: 0.5;
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

export default function Section({ title, children }) {
  return (
    <Container>
      <Title>{title}</Title>
      <List> {children} </List>
    </Container>
  );
}
