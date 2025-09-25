import styled from "styled-components";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import BalancePanel from "./BalancePanel";
import AddBalancePanel from "./AddBalancePanel";
import RechargeHistory from "./RechargeHistory";
import UsageHistory from "./UsageHistory";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  /* justify-content: space-between; */
  margin-top: 30px;

  @media (max-width: 900px) {
    margin-top: 0;
  }
`;

let placeholderData = { title: "Lotus Scene" };

const Column1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Row1 = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
  flex: 1;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export default function ManageBillingPage() {
  return (
    <LoggedInBoilerplate>
      <Container>
        <Row1>
          <Column1>
            <BalancePanel />
            <AddBalancePanel />
          </Column1>

          <RightSection>
            <RechargeHistory />
            <UsageHistory />
          </RightSection>
        </Row1>
      </Container>
    </LoggedInBoilerplate>
  );
}
