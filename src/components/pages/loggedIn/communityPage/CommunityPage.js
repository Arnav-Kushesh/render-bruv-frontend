import styled from "styled-components";
import AnimatedPillTabs from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import contentPurposeTypes from "../../../../data/contentPurposeTypes";
import { useState } from "react";
import CustomButton from "../../../helperComponents/CustomButton";
import { MdAdd } from "react-icons/md";
import ContentAggregator from "../../../applicationUI/aggregator/ContentAggregator";
import goTo from "../../../../controllers/goTo";

let tabContainerStyle = {
  border: "1px solid var(--borderIntense)",
  borderRadius: "10px",
  background: "transparent",
};

let pillStyle = null;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  justify-content: space-between;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 10px;
  }
`;

let types = [
  { label: "Artworks", value: "SHARE_ART" },
  { label: "Feature Requests", value: "FEATURE_REQUEST" },
  { label: "Discussions", value: "DISCUSSION" },
  { label: "Issues", value: "RAISE_ISSUE" },
];

export default function CommunityPage() {
  const [purpose, setPurpose] = useState("SHARE_ART");

  return (
    <LoggedInBoilerplate>
      <Container>
        <TopSection>
          <AnimatedPillTabs
            containerStyle={tabContainerStyle}
            pillStyle={pillStyle}
            value={purpose}
            onChange={setPurpose}
            tabs={types}
          />
          <CustomButton onClick={goTo("/select-post-type")} icon={<MdAdd />}>
            Post
          </CustomButton>
        </TopSection>

        <ContentAggregator
          columns={2}
          purposeOverride={purpose}
          hideTitleSection={true}
        />
      </Container>
    </LoggedInBoilerplate>
  );
}
