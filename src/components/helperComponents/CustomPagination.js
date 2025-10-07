import styled from "styled-components";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 20px;
  overflow: hidden;
  gap: 1px;
  overflow: hidden;
  height: 40px;
  color: var(--element);
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: var(--surface);
  user-select: none;

  &:hover {
    background-color: var(--surface2);
  }

  &.active {
    background-color: var(--surface2);
    font-weight: bold;
  }
`;

export default function CustomPagination({ value = 0, onChange, max }) {
  const increment = () => {
    if (value + 1 < max) onChange(value + 1);
  };

  const decrement = () => {
    if (value - 1 >= 0) onChange(value - 1);
  };

  const pages = [];
  const startPage = Math.max(0, value - 4);
  const endPage = Math.min(max - 1, value + 4);

  // Always show first page
  if (startPage > 0) {
    pages.push(0);
    if (startPage > 1) pages.push("...");
  }

  // Add middle range
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Always show last page
  if (endPage < max - 1) {
    if (endPage < max - 2) pages.push("...");
    pages.push(max - 1);
  }

  return (
    <Container>
      <Button style={{ borderRadius: "15px 0 0 15px" }} onClick={decrement}>
        <RiArrowLeftSLine />
      </Button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <Button key={idx} style={{ cursor: "default" }}>
            {p}
          </Button>
        ) : (
          <Button
            key={idx}
            className={p === value ? "active" : ""}
            onClick={() => onChange(p)}
          >
            {p + 1}
          </Button>
        )
      )}

      <Button style={{ borderRadius: "0 15px 15px 0" }} onClick={increment}>
        <RiArrowRightSLine />
      </Button>
    </Container>
  );
}
