import { styled } from "styled-components";
import goTo from "../../controllers/goTo";
import { MdCheckBox, MdDone } from "react-icons/md";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--surface3);
  border: 1px solid var(--border);
  border-radius: 10px;
  gap: 30px;
  padding: 15px;

  @media (max-width: 900px) {
    /* flex-direction: column; */
    /* gap: 20px; */
  }

  ${({ $isActive }) => {
    if ($isActive)
      return `
        background: var(--surface);
  `;
  }}
`;
const Name = styled.div`
  font-size: 15px;
  color: var(--elementDim);
  font-weight: 600;
`;

const Box = styled.div`
  background: var(--surface);
  color: transparent;
  height: 30px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  width: 30px;
  font-size: 18px;
  border: 1px solid var(--border);
  border-radius: 10px;
  ${({ $isActive }) => {
    if ($isActive)
      return `
  
    background: var(--activeSurface);
    color: var(--activeELement);
  
  
  `;
  }}

  &:hover {
    background-color: var(--elementDim);
  }
`;
export default function CustomCheckbox({ label, value, onChange, style }) {
  return (
    <Container style={style} $isActive={value}>
      {label ? <Name>{label}</Name> : null}

      <Box
        onClick={() => {
          onChange(value ? false : true);
        }}
        $isActive={value}
      >
        {value ? <MdDone /> : null}
      </Box>
    </Container>
  );
}
