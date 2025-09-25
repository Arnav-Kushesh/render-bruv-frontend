import styled from "styled-components";
import Footer from "../loggedOut/landingPage/Footer";
import { useContext } from "react";
import Context from "../../../Context";
import LoginWall from "./LoginWall";
import AnimatedPage from "./AnimatedPage";
import LoggedInTopBar from "./LoggedInTopBar";
import MessageBox from "../../helperComponents/MessageBox";
import CustomButton from "../../helperComponents/CustomButton";
import logout from "../../../controllers/logout";
import ShortWidth from "../../helperComponents/utils/ShortWidth";

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Gap = styled.div`
  display: flex;
  height: 100px;
`;

const MainContent = styled.div`
  width: 100%;
`;

export default function LoggedInBoilerplate({
  children,
  showFooter,
  allowWithoutLogin,
  titleLine1,
  titleLine2,
  showBackButton,
  isHome,
}) {
  const { loggedInUserId, loggedInUser } = useContext(Context);

  if (!loggedInUserId && !allowWithoutLogin) return <LoginWall />;

  if (loggedInUser.isBanned) {
    return (
      <Main>
        <MessageBox> You have been banned </MessageBox>
        <CustomButton onClick={logout}>Logout</CustomButton>
      </Main>
    );
  }

  return (
    <AnimatedPage>
      <Main>
        <ShortWidth>
          {/* <LoggedInTopBar
            isHome={isHome}
            showBackButton={showBackButton}
            titleLine1={titleLine1}
            titleLine2={titleLine2}
          /> */}

          <MainContent>
            {children}
            <Gap />
            {showFooter ? <Footer /> : null}
          </MainContent>
        </ShortWidth>
      </Main>
    </AnimatedPage>
  );
}
