import styled from "styled-components";

const Container = styled.div`
  width: auto;
  color: #fff;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;
  border-radius: 20px;
  opacity: 0.9;
  /* cursor: pointer; */
  transition: all 0.2s ease-in-out;
  padding: 15px 25px;
  /* border: 1px solid #cbd06542; */

  /* background-color: rgb(203 208 101 / 10%); */
  /* &:hover {
    transform: scale(0.93);
  } */
`;

const Image = styled.img`
  height: 40px;
  width: auto;
`;

const Title = styled.div`
  width: 100%;
  font-weight: 600;
  font-size: 18px;
  color: var(--accentDim);
`;

const Description = styled.div`
  width: 100%;
  font-size: 19px;
  opacity: 0.7;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
`;

export default function FeatureRowItem({
  image,
  title,
  description,
  gradient,
  filter,
}) {
  return (
    <Container>
      <TitleContainer>
        <Image src={`/graphics/${image}`} />
        <Title>{title}</Title>
      </TitleContainer>
    </Container>
  );
}
