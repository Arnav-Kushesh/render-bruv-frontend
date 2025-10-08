import styled from "styled-components";
import CompanyStatAggregator from "../../../../../applicationUI/aggregator/CompanyStatAggregator";
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
        <CompanyStatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"REVENUE"}
          durationTypeOverride={"DATE"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Month Wise Revenue</CustomLabel>
        <CompanyStatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"REVENUE"}
          durationTypeOverride={"MONTH"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Year Wise Revenue</CustomLabel>
        <CompanyStatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"REVENUE"}
          durationTypeOverride={"YEAR"}
        />
      </ElevatedSection>
    </Column>
  );
}
