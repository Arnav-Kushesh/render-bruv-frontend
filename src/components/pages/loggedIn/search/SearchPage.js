import LoggedInBoilerplate from "../LoggedInBoilerplate";
import styled from "styled-components";
import { useState } from "react";
import MaterialInput from "../../../helperComponents/MaterialInput";
import AnimatedPillTabs from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";
import ProfileAggregator from "../../../applicationUI/aggregator/ProfileAggregator";
import ContentAggregator from "../../../applicationUI/aggregator/ContentAggregator";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Row2Section = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;

const DataColumn = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;
  gap: 30px;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 950px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  @media (max-width: 900px) {
    width: 100%;
    margin: 0;
  }
`;

let typeOptions = [
  { value: "PROFILE", label: "Profiles" },
  { value: "POST", label: "Content" },
];

export default function SearchPage() {
  let title1 = "Search";
  let title2 = "Page";

  const [activeTab, setActiveTab] = useState("PROFILE");
  const [tmpValue, setTmpValue] = useState(null);
  const [inheritedSearchQuery, setInheritedSearchQuery] = useState(null);

  return (
    <LoggedInBoilerplate titleLine1={title1} titleLine2={title2}>
      <Center>
        <Container>
          <SearchContainer>
            <MaterialInput
              label={"Search"}
              value={tmpValue}
              onEnter={(e) => {
                setInheritedSearchQuery(e.target.value);
              }}
              onChange={(e) => {
                setTmpValue(e.target.value);
              }}
            />
          </SearchContainer>
          <AnimatedPillTabs
            tabs={typeOptions}
            value={activeTab}
            onChange={setActiveTab}
          />

          {activeTab == "PROFILE" ? (
            <ProfileAggregator
              columns={2}
              inheritedSearchQuery={inheritedSearchQuery}
              hideTitleSection={true}
            />
          ) : (
            <ContentAggregator
              columns={2}
              inheritedSearchQuery={inheritedSearchQuery}
              hideTitleSection={true}
            />
          )}
        </Container>
      </Center>
    </LoggedInBoilerplate>
  );
}
