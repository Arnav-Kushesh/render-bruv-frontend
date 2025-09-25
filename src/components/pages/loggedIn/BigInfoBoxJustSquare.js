import styled from "styled-components";

const Img = styled.img`
  height: 40px;
  width: 40px;
  opacity: 0.7;
  cursor: pointer;
  object-fit: contain;
`;

const Container = styled.div`
  animation: centerScaleReveal 0.6s ease-in-out forwards;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;

  gap: 17px;

  border-radius: 10px;

  width: 100%;

  color: var(--accent);

  border: 1px solid var(--border);
  background-color: var(--surface);
  cursor: pointer;

  transition: all 0.25s ease-in-out;

  padding: 30px 30px;

  @media (max-width: 900px) {
    padding: 15px;
    gap: 10px;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Icon = styled.div`
  font-size: 33px;
  display: flex;
  opacity: 0.9;
  color: var(--element);
  justify-content: center;
  align-items: center;
`;

const PlainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  width: 100%;

  align-items: center;
`;

const Title = styled.div`
  font-weight: 700;
  color: var(--element);
  font-size: 18px;

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

const Subtitle = styled.div`
  font-size: 14px;
  opacity: 0.9;
  color: var(--elementDim);
  font-weight: 600;

  @media (max-width: 900px) {
    font-size: 12px;
  }
`;

export default function BigInfoBoxJustSquare({
  link,
  icon,
  primaryText = "XXXX",
  secondaryText,
}) {
  primaryText = primaryText.toString();
  // console.log(primaryText.length);
  for (let i = 1; i <= 4 - primaryText.length; i++) {
    primaryText = "0" + primaryText;
  }

  return (
    <Container>
      {icon ? <Icon>{icon}</Icon> : null}

      <Text>
        <Title>{primaryText}</Title>
        <Subtitle>{secondaryText}</Subtitle>
      </Text>
    </Container>
  );
}
