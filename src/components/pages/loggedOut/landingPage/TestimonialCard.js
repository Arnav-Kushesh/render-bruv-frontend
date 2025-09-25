import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  background-color: var(--gradientSurface);
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(0.93);
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
  margin-bottom: 20px;
  color: #999;
`;

const Image = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 100px;
`;

const Title = styled.div`
  width: 100%;
  font-weight: 900;
  font-size: 15px;
  font-family: "Futur", sans-serif;
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  opacity: 0.7;
`;

export default function TestimonialCard({ image, name, children }) {
  return (
    <Container>
      <Image src={image} />
      <Text>
        <Description>{children}</Description>
        <Title>{name}</Title>
      </Text>
    </Container>
  );
}
