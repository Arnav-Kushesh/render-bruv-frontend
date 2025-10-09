import { useContext } from "react";
import WithBackground from "../../core/boilerplate/WithBackground";
import LoggedOutHeader from "../loggedOut/landingPage/LoggedOutHeader";
import styled from "styled-components";
import Footer from "../loggedOut/landingPage/Footer";
import Context from "../../../Context";
import ShortWidth from "../../helperComponents/utils/ShortWidth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  margin-top: 50px;
  width: 100%;

  align-items: center;

  @media (max-width: 900px) {
    gap: 30px;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  align-items: center;
  padding-bottom: 30px;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  align-items: flex-end;
`;

const Title = styled.div`
  font-weight: 900;
  font-size: 30px;
  margin-bottom: 30px;
  color: var(--element);

  width: 90%;
  text-transform: uppercase;
  font-weight: 900;

  font-family: "Montserrat", sans-serif;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Text = styled.div``;

export default function FooterPageBoilerplate({ title, children }) {
  const { loggedInUserId } = useContext(Context);
  return (
    <ShortWidth>
      <Container>
        {loggedInUserId ? null : <LoggedOutHeader />}

        <Content>
          <Title>{title}</Title>

          <Text dangerouslySetInnerHTML={{ __html: children }}></Text>

          <br />
          <br />
          <br />
          <br />
        </Content>
      </Container>

      <Footer />
    </ShortWidth>
  );
}
