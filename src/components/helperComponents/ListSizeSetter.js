import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`;

const Label = styled.button`
  padding: 12px 15px;
  border: none;
  border-radius: 15px;
  font-size: 15px;
  opacity: 0.7;
  text-transform: capitalize;
  background-color: ${({ active }) =>
    active ? "var(--element)" : "var(--surface)"};
  color: ${({ active }) => (active ? "var(--surfaceSolid)" : "var(--element)")};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--surface2);
  }
`;

const SizeButton = styled.button`
  padding: 12px 15px;
  border: none;
  font-size: 15px;
  border-radius: 15px;
  background-color: ${({ active }) =>
    active ? "var(--element)" : "var(--surface)"};
  color: ${({ active }) => (active ? "var(--surfaceSolid)" : "var(--element)")};

  cursor: pointer;
  transition: background-color 0.2s ease;
  border: 1px solid var(--border);

  &:hover {
    background-color: var(--surface2);
  }
`;

export default function ListSizeSetter({ value = 10, onChange }) {
  const sizes = [10, 50, 100, 200, 500, 5000];

  return (
    <MainContainer>
      <Label>Elements Per Page</Label>

      {sizes.map((size) => (
        <SizeButton
          key={size}
          active={value === size}
          onClick={() => onChange(size)}
        >
          {size}
        </SizeButton>
      ))}
    </MainContainer>
  );
}
