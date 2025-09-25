import { useContext } from "react";
import Context from "../../Context";
import styled from "styled-components";
import LoggedInHeaderHoz from "./LoggedInHeaderHoz";
import LoggedInHeader from "../vertical/LoggedInHeader";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100vw;
`;

const ContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 30px;
  flex: 1;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

const MobileMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export default function WithLoggedInHeaderHoz({ children }) {
  const { loggedInUserId, isMobile } = useContext(Context);

  if (!loggedInUserId) return children;

  // return null;
  return (
    <Container>
      <LoggedInHeaderHoz />
      <Main>{children}</Main>
    </Container>
  );
}
