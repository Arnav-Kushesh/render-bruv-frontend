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

export default function AdminProfitStat() {
  return (
    <Column>
      <ElevatedSection>
        <CustomLabel>Date Wise Profit</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"PROFIT"}
          durationTypeOverride={"DATE"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Month Wise Profit</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"PROFIT"}
          durationTypeOverride={"MONTH"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Year Wise Profit</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"PROFIT"}
          durationTypeOverride={"YEAR"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>
    </Column>
  );
}
