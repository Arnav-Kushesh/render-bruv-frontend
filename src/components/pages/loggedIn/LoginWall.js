import styled from "styled-components";
import WithBackground from "../../core/boilerplate/WithBackground";
import InputCard from "../../helperComponents/InputCard";
import PrimaryButton from "../../helperComponents/PrimaryButton";
import goTo from "../../../controllers/goTo";
import BrandContainer from "../../brand/BrandContainer";
import BrandContainerThemed2d from "../../brand/BrandContainerThemed2d";

const Container = styled.div``;
const Main = styled.div``;

export default function LoginWall() {
  return (
    <WithBackground backgroundImage={"/dumbbells.jpg"}>
      <Container>
        <Main>
          <br /> <br /> <br />
          <BrandContainerThemed2d />
          <br />
          <InputCard title="You can only access this page once you login">
            <PrimaryButton onClick={goTo("/")}>Go Home</PrimaryButton>
          </InputCard>
        </Main>
      </Container>
    </WithBackground>
  );
}
