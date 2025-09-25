import styled from "styled-components";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Container = styled.div`
  /* background-color: var(--surface); */
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  gap: 1px;
  overflow: hidden;
  height: 40px;
  /* width: 102px; */
  color: var(--element);
  justify-content: center;
`;
const Button = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--surface);

  &:hover {
    background-color: var(--surface2);
  }
`;
const PageName = styled.div`
  height: 40px;
  padding: 0 10px;
  /* width: 20px; */
  background-color: var(--surface2);
  display: flex;
  text-transform: capitalize;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    flex: 1;
  }
`;

export default function CustomPagination({ value = 0, onChange, max }) {
  return (
    <Container>
      <Button onClick={decrement}>
        <RiArrowLeftSLine />
      </Button>
      <PageName>
        {value + 1} / {max}
      </PageName>
      <Button onClick={increment}>
        <RiArrowRightSLine />
      </Button>
    </Container>
  );

  function increment() {
    let newVal = value + 1;
    if (newVal >= max) return null;
    onChange(newVal);
  }

  function decrement() {
    let newValue = value - 1;

    if (newValue < 0) return;
    onChange(newValue);
  }
}
