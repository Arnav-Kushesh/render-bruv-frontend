import styled from "styled-components";
import WithBackground from "../../core/boilerplate/WithBackground";
import LoggedOutHeader from "./landingPage/LoggedOutHeader";
import AnimatedPage from "../loggedIn/AnimatedPage";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  gap: 50px;
`;

const Title = styled.h2``;

export default function LoggedOutBoilerplate({ children, onlyRenderContent }) {
  if (onlyRenderContent) return children;
  return (
    <AnimatedPage>
      <Container>
        <LoggedOutHeader />

        {children}
      </Container>
    </AnimatedPage>
  );
}
