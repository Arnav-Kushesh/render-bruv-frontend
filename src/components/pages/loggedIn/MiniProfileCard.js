import styled from "styled-components";
import goTo from "../../../controllers/goTo.js";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  gap: 0;
  cursor: pointer;
  background: var(--surface2);
  border: 1px solid var(--border);
  animation: centerScaleReveal 0.4s ease-in-out forwards;
`;

const Image = styled.img`
  object-fit: cover;
  width: 50px;
  border-radius: 100px;
  height: 50px;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  padding: 10px 24px;
  /* margin-right: 10px; */

  @media (max-width: 900px) {
    /* display: none; */
  }
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--element);
  text-transform: capitalize;
`;

const Desc = styled.div`
  font-size: 12px;
  text-transform: capitalize;
  color: var(--elementDim);
  font-weight: 600;
`;

export default function MiniProfileCard({ onClick, item }) {
  return (
    <Container onClick={onClick ? onClick : goTo(`/employee/${item._id}`)}>
      {/* <Image src={getImageURL(item.profileImage)}></Image> */}
      <Text>
        <Title>{item.name}</Title>
      </Text>
    </Container>
  );
}
