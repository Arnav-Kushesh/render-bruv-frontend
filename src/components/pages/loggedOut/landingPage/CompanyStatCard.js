import styled from "styled-components";

const Container = styled.div`
  width: 200px;

  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: 20px;
  &:hover {
    transform: scale(0.93);
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;
  width: 90%;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 130px;
  height: 130px;
  object-fit: cover;
  justify-content: center;
  align-items: center;
  border-radius: 100px;

  padding: 0;
`;

const Title = styled.div`
  width: 100%;
  font-weight: 900;
  font-size: 18px;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-style: italic;
`;

const Description = styled.div`
  width: 100%;
  text-align: center;
  font-size: 15px;
  opacity: 0.7;
`;

const ImageContainer = styled.div`
  display: flex;
  width: 160px;
  height: 160px;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 200px;

  /* animation: shadowLoop 0.9s infinite; */

  box-shadow: 0.5px 0.5px;
`;

export default function CompanyStatCard({
  image,
  title,
  description,
  gradient,
}) {
  return (
    <Container>
      <ImageContainer>
        <Image src={`/company-stat/${image}.jpg`} />
      </ImageContainer>

      <Text>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Text>
    </Container>
  );
}
