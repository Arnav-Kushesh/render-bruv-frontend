import styled from "styled-components";
import ProfileAggregator from "../../applicationUI/aggregator/ProfileAggregator";
import LoggedInBoilerplate from "./LoggedInBoilerplate";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;

  @media (max-width: 900px) {
    margin: 0;
  }
`;

export default function AccountsPage() {
  return (
    <LoggedInBoilerplate
      showBackButton={true}
      titleLine1={"Account"}
      titleLine2={"List"}
    >
      <Container>
        <ProfileAggregator columns={2} />
      </Container>
    </LoggedInBoilerplate>
  );
}
