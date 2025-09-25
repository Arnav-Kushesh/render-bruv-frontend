import styled from "styled-components";

const Container = styled.div`
  width: 100px;
  font-size: 30px;
  background-color: var(--gradientSurface);
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(0.93);
  }
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
  font-family: "Montserrat", sans-serif;
  font-style: italic;
`;

const Description = styled.div`
  width: 100%;
  font-size: 15px;
  opacity: 0.7;
`;

export default function AlumniCompanyCard({ children }) {
  return <Container>{children}</Container>;
}
