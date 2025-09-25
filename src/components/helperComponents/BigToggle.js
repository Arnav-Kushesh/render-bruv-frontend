import styled from "styled-components";
import CustomButton from "./CustomButton";
const Title = styled.div`
  font-size: 18px;
  color: #555;

  font-weight: 800;

  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  font-size: 13px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.div`
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 10px;
  background: var(--surface2);
  color: #fff;
  border: 1px solid var(--borderDim);

  font-weight: 600;
  font-family: "Montserrat", sans-serif;

  display: flex;
  flex-direction: column;
  gap: 5px;
  ${({ $isSelected }) => {
    if ($isSelected)
      return `
        background: var(--accent);
        color: var(--mainBackground);
    `;
  }};

  cursor: pointer;

  transition: all 0.25s ease-in-out;

  &:hover {
    transform: scale(0.9);
  }

  @media (max-width: 900px) {
    font-size: 15px;
  }
`;

const PrimaryLabel = styled.div`
  text-transform: capitalize;
`;

const SecondaryLabel = styled.div`
  font-size: 10px;
  opacity: 0.5;
`;

export default function BigToggle({ title, options }) {
  let theDisabledButtonStyle = { pointerEvent: "none", opacity: 0.5 };

  return (
    <Container>
      <Title>{title}</Title>
      <Row>
        {options.map((item) => (
          <Button
            key={item.label}
            style={item.onClick ? null : theDisabledButtonStyle}
            onClick={item.onClick}
            $isSelected={item.isSelected}
          >
            <PrimaryLabel>{item.label}</PrimaryLabel>
            {item.secondaryLabel ? (
              <SecondaryLabel>{item.secondaryLabel}</SecondaryLabel>
            ) : null}
          </Button>
        ))}
      </Row>
    </Container>
  );
}
