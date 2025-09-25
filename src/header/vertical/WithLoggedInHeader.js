import { useContext } from "react";
import Context from "../../Context";
import LoggedInHeader from "./LoggedInHeader";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
`;

const MobileMain = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

export default function WithLoggedInHeader({ children }) {
  const { loggedInUserId, isMobile } = useContext(Context);

  if (!loggedInUserId) return children;

  if (isMobile) {
    return (
      <ContainerMobile>
        <LoggedInHeader />
        <MobileMain>{children}</MobileMain>
      </ContainerMobile>
    );
  }

  // return null;
  return (
    <Container>
      <LoggedInHeader />
      <Main>{children}</Main>
    </Container>
  );
}
