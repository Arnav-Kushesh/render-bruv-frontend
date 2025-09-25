import ContentAggregator from "../../../applicationUI/aggregator/ContentAggregator.js";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 900px;
  margin-top: 50px;

  @media (max-width: 900px) {
    width: 100%;
    margin: 0;
  }
`;

export default function ProfilePageFeed({ user }) {
  return (
    <Container>
      <ContentAggregator
        hideTitleSection={true}
        userId={user._id}
        columns={2}
      />
    </Container>
  );
}
