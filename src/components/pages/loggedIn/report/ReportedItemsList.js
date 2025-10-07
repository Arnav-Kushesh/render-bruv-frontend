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
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  margin-top: 0;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

let typeOptions = [
  { value: "PROFILE", label: "Profiles" },
  { value: "POST", label: "Content" },
];

export default function ReportedItemsList() {
  let title1 = "Reported";
  let title2 = "Items";

  const [activeTab, setActiveTab] = useState("PROFILE");

  return (
    <Container>
      <AnimatedPillTabs
        value={activeTab}
        onChange={setActiveTab}
        tabs={typeOptions}
      />

      {activeTab == "PROFILE" ? (
        <ProfileAggregator
          columns={2}
          showReportedItems={true}
          hideTitleSection={true}
        />
      ) : (
        <ContentAggregator
          columns={2}
          showReportedItems={true}
          hideTitleSection={true}
        />
      )}
    </Container>
  );
}
