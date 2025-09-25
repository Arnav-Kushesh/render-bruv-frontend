import styled from "styled-components";

const Img = styled.img`
  height: 40px;
  width: 40px;
  opacity: 0.7;
  cursor: pointer;
  object-fit: contain;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;

  gap: 17px;

  flex: 1;
  border-radius: 10px;

  width: 100%;

  color: var(--accent);

  border: 1px solid var(--borderDim);
  background-color: var(--surface);
  cursor: pointer;

  transition: all 0.25s ease-in-out;

  padding: 20px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Icon = styled.div`
  font-size: 33px;
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
  font-weight: 900;
  font-size: 18px;
`;

const Subtitle = styled.div`
  font-size: 14px;
  opacity: 0.7;
`;

export default function BigInfoBoxFlexMax({
  link,
  icon,
  primaryText,
  secondaryText,
}) {
  return (
    <Container>
      {icon ? <Img src={icon} /> : null}

      <Text>
        <Title>{primaryText}</Title>
        <Subtitle>{secondaryText}</Subtitle>
      </Text>
    </Container>
  );
}
