import ContentAggregator from "../../../../applicationUI/aggregator/ContentAggregator";
import styled from "styled-components";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  }
`;

export default function IssuePostList() {
  return (
    <ContentAggregator
      columns={2}
      purposeOverride={"RAISE_ISSUE"}
      hideTitleSection={true}
    />
  );
}
