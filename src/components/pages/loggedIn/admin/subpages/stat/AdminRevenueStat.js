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

export default function AdminRevenueStat() {
  return (
    <Column>
      <ElevatedSection>
        <CustomLabel>Date Wise Revenue</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"REVENUE"}
          durationTypeOverride={"DATE"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Month Wise Revenue</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"REVENUE"}
          durationTypeOverride={"MONTH"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Year Wise Revenue</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"REVENUE"}
          durationTypeOverride={"YEAR"}
          processAmount={(data) => data / 100}
        />
      </ElevatedSection>
    </Column>
  );
}
