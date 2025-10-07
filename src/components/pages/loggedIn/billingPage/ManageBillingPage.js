import styled from "styled-components";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import BalancePanel from "./BalancePanel";
import AddBalancePanel from "./AddBalancePanel";
import RechargeHistory from "./RechargeHistory";
import UsageHistory from "./UsageHistory";
import RechargeHistoryAggregator from "../../../applicationUI/aggregator/RechargeHistoryAggregator";
import { useContext } from "react";
import Context from "../../../../Context";
import LoadingSection from "../../../helperComponents/LoadingSection";
import UserTransactionAggregator from "../../../applicationUI/aggregator/UserTransactionAggregator";
import ElevatedSection from "../../../helperComponents/general/ElevatedSection";
import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";

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
            <ElevatedSection style={{ flex: 1 }}>
              <CustomLabel>Recharge History</CustomLabel>
              <RechargeHistoryAggregator
                hideTitleSection={true}
                showMyData={true}
              />
            </ElevatedSection>

            <ElevatedSection style={{ flex: 1 }}>
              <CustomLabel>Usage Data</CustomLabel>
              <UserTransactionAggregator
                showMyData={true}
                hideTitleSection={true}
              />
            </ElevatedSection>
          </RightSection>
        </Row1>
      </Container>
    </LoggedInBoilerplate>
  );
}
