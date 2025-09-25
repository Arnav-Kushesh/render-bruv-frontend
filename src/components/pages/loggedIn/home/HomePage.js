import styled from "styled-components";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import { useContext } from "react";
import Context from "../../../../Context";
import LoadingSection from "../../../helperComponents/LoadingSection";
import ContentAggregator from "../../../applicationUI/aggregator/ContentAggregator";
import NgoPageList from "./RecentProjectList";
import CreateProjectSection from "./CreateProject/CreateProjectSection";
import RecentProjectList from "./RecentProjectList";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;

  /* For tablets */
  @media (max-width: 1200px) {
    width: 62vw;
  }

  @media (max-width: 900px) {
    gap: 50px;
    width: 100%;
    margin-top: 0px;
    flex-direction: column-reverse;
    justify-content: flex-start;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  gap: 50px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 40px;
    margin-top: -20px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 30px;
  flex: 1;

  @media (max-width: 900px) {
    gap: 15px;
    margin-top: 15px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: var(--accent);
  opacity: 0.8;
`;
const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MobileHomeHeader = styled.div`
  display: none;

  @media (max-width: 900px) {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const MobileRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TypeButton = styled.div`
  background-color: var(--accentSurface);
  border: 1px solid var(--accentDim);
  color: var(--accent);
  border-radius: 10px;
  padding: 18px 20px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--accentDim);
  }
`;
const NgoTypePages = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export default function HomePage() {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  if (!loggedInUser)
    return (
      <Container>
        <LoadingSection />
      </Container>
    );

  return (
    <LoggedInBoilerplate
      titleLine1={"Welcome!"}
      // titleLine2={"Home Page"}
      showFooter={true}
      isHome={true}
    >
      <Center>
        <Container>
          <RecentProjectList />
          <CreateProjectSection />
        </Container>
      </Center>
    </LoggedInBoilerplate>
  );
}
