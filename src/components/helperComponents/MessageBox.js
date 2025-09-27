import styled from "styled-components";

const Container = styled.div`
  padding: 15px;
  min-width: 300px;
  text-align: center;
  border-radius: 10px;
  background: var(--surface);
  font-weight: 600;
  color: var(--element);
  border: 1px solid var(--border);

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 80vw;
  }
`;

export default function MessageBox({ children, style }) {
  return <Container style={style}>{children}</Container>;
}
