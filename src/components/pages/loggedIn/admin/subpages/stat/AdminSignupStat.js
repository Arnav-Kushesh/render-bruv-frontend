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

export default function AdminSignupStat() {
  return (
    <Column>
      <ElevatedSection>
        <CustomLabel>Date Wise Sign ups</CustomLabel>
        <CompanyStatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"SIGNUP"}
          durationTypeOverride={"DATE"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Month Wise Sign ups</CustomLabel>
        <CompanyStatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"SIGNUP"}
          durationTypeOverride={"MONTH"}
        />
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Year Wise Sign ups</CustomLabel>
        <CompanyStatAggregator
          viewMode={"BAR_GRAPH"}
          hideTitleSection={true}
          typeOverride={"SIGNUP"}
          durationTypeOverride={"YEAR"}
        />
      </ElevatedSection>
    </Column>
  );
}
