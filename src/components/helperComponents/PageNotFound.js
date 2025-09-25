import styled from "styled-components";
import goTo from "../../controllers/goTo";
import CustomButton from "./CustomButton";
import { LiaEdge } from "react-icons/lia";
import BrandContainer from "../brand/BrandContainer";
import BrandContainerThemed2d from "../brand/BrandContainerThemed2d";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  justify-content: center;
  padding: 30px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

export default function PageNotFound({ message }) {
  if (!message) message = "Page not found";

  return (
    <Container>
      <br />
      {/* <BrandContainerThemed2d /> */}
      <br />
      <h1>{message}</h1>

      <Buttons>
        <CustomButton href={"/"}>Go Home</CustomButton>
      </Buttons>
    </Container>
  );
}
