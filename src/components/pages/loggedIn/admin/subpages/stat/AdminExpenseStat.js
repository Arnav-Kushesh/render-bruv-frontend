import styled from "styled-components";
import StatAggregator from "../../../../../applicationUI/aggregator/StatAggregator";
import ElevatedSection from "../../../../../helperComponents/general/ElevatedSection";
import CustomLabel from "../../../../../applicationUI/customLabel/CustomLabel";

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

export default function AdminExpenseStat() {
  return (
    <Column>
      <ElevatedSection>
        <CustomLabel>Date Wise Expense</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"PENDING_EXPENSE"}
          durationTypeOverride={"DATE"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Month Wise Expense</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"PENDING_EXPENSE"}
          durationTypeOverride={"MONTH"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Year Wise Expense</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"PENDING_EXPENSE"}
          durationTypeOverride={"YEAR"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>
    </Column>
  );
}
