import styled from "styled-components";

const Container = styled.div`
  width: 38vw;
  background-color: var(--gradientSurface);
  color: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  border-radius: 10px;

  transition: all 0.2s ease-in-out;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Image = styled.img`
  height: 40px;
  width: auto;

  @media (max-width: 900px) {
    height: 30px;
  }
`;

const Title = styled.div`
  width: 100%;
  font-weight: 900;
  font-size: 24px;
  color: var(--accent);

  font-family: "Montserrat", sans-serif;
  font-style: italic;

  @media (max-width: 900px) {
    font-size: 18px;
  }
`;

const Description = styled.div`
  width: 100%;
  font-size: 19px;
  opacity: 0.7;

  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

export default function WhyChooseUsCard({ image, title, description }) {
  return (
    <Container>
      <TitleContainer>
        <Image src={`/graphics/${image}`} />
        <Title>{title}</Title>
      </TitleContainer>

      <Description>{description}</Description>
    </Container>
  );
}
