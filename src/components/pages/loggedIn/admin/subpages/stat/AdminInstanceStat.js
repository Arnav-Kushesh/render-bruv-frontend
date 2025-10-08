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

export default function AdminInstanceStat() {
  return (
    <Column>
      <ElevatedSection>
        <CustomLabel>Date Wise Instance Creation</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"INSTANCE_CREATION"}
          durationTypeOverride={"DATE"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Month Wise Instance Creation</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"INSTANCE_CREATION"}
          durationTypeOverride={"MONTH"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Year Wise Instance Creation</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"INSTANCE_CREATION"}
          durationTypeOverride={"YEAR"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Date Wise Instance Termination</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"INSTANCE_TERMINATION"}
          durationTypeOverride={"DATE"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Month Wise Instance Termination</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"INSTANCE_TERMINATION"}
          durationTypeOverride={"MONTH"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Year Wise Instance Termination</CustomLabel>
        <StatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"INSTANCE_TERMINATION"}
          durationTypeOverride={"YEAR"}
        />
      </ElevatedSection>
    </Column>
  );
}
