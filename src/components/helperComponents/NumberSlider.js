import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1px;
  border-radius: 10px;
  overflow: hidden;
  font-size: 13px;
`;

const Button = styled.div`
  background: var(--surface2);
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background: var(--surface);
  }
`;

const Medium = styled.div`
  background: var(--surface2);
  padding: 5px 10px;
`;

export default function NumberSlider({ value, onChange }) {
  return (
    <Container>
      <Button onClick={decrement}>
        <AiOutlineLeft />
      </Button>
      <Medium>{value}</Medium>
      <Button onClick={increment}>
        <AiOutlineRight />
      </Button>
    </Container>
  );

  function increment() {
    onChange(value + 1);
  }

  function decrement() {
    onChange(value - 1);
  }
}
