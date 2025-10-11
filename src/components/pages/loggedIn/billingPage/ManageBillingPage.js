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
import StatAggregator from "../../../applicationUI/aggregator/StatAggregator";
import Footer from "../../loggedOut/landingPage/Footer";

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
  gap: 20px;
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
  flex-direction: column;
  flex: 1;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export default function ManageBillingPage() {
  const { loggedInUser } = useContext(Context);

  return (
    <LoggedInBoilerplate>
      <Container>
        <Row1>
          <Column1>
            <BalancePanel />
            <AddBalancePanel />

            <ElevatedSection>
              <CustomLabel>Recharge History</CustomLabel>
              <RechargeHistoryAggregator
                hideTitleSection={true}
                showMyData={true}
              />
            </ElevatedSection>
          </Column1>

          <RightSection>
            <ElevatedSection>
              <CustomLabel>Date Wise Usage</CustomLabel>
              <StatAggregator
                processAmount={(data) => data / 100}
                userId={loggedInUser._id}
                viewMode={"BAR_GRAPH"}
                hideTitleSection={true}
                typeOverride={"USER_INSTANCE_USAGE_IN_CENTS"}
                durationTypeOverride={"DATE"}
              />
            </ElevatedSection>

            <ElevatedSection>
              <CustomLabel>Month Wise Usage</CustomLabel>
              <StatAggregator
                processAmount={(data) => data / 100}
                userId={loggedInUser._id}
                viewMode={"BAR_GRAPH"}
                hideTitleSection={true}
                typeOverride={"USER_INSTANCE_USAGE_IN_CENTS"}
                durationTypeOverride={"MONTH"}
              />
            </ElevatedSection>

            <ElevatedSection>
              <CustomLabel>Year Wise Usage</CustomLabel>
              <StatAggregator
                processAmount={(data) => data / 100}
                userId={loggedInUser._id}
                viewMode={"USER_INSTANCE_USAGE_IN_CENTS"}
                hideTitleSection={true}
                typeOverride={"REVENUE"}
                durationTypeOverride={"YEAR"}
              />
            </ElevatedSection>
          </RightSection>
        </Row1>
      </Container>
    </LoggedInBoilerplate>
  );
}
