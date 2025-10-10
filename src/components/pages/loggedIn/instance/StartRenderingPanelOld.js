import styled from "styled-components";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import AnimatedPillTabs from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";
import MaterialInput from "../../../helperComponents/MaterialInput";

import { GoArrowRight } from "react-icons/go";

import BlendFileUploadSection from "./BlendFileUploadSection";
import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import CustomLabelDim from "../../../applicationUI/customLabel/CustomLabelDim";
import CustomLabelExtraSmall from "../../../applicationUI/customLabel/CustomLabelExtraSmall";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  width: 410px;
  border-radius: 10px;
  padding: 35px;
  padding-bottom: 60px;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 15px;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 20px;
`;

const CustomInput = styled.input`
  background: var(--surface2);
  border-radius: 20px;
  color: var(--element);
  border: 1px solid var(--border);
  font-size: 15px;
  padding: 20px 20px;
  font-weight: 700;
  font-size: 15px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

let typeTabs = [
  { value: "ANIMATION", label: "Animation" },
  { value: "IMAGE", label: "Image" },
  { value: "RANGE", label: "Range" },
];

let engineTabs = [
  { value: "EEVEE", label: "Eevee" },
  { value: "WORKBENCH", label: "Workbench" },
  { value: "CYCLES", label: "Cycles" },
];

let methodTabs = [
  { value: "OPTIX", label: "Optix" },
  { value: "CUDA", label: "Cuda" },
];

const RangeInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

let tabContainerStyle = {
  border: "1px solid var(--borderIntense)",
  borderRadius: "10px",
  background: "transparent",
};

let pillStyle = null;

export default function StartRenderingPanel({
  renderSettings,
  setRenderSettings,
  baseUrl,
  refreshExecutionData,
}) {
  return (
    <Container>
      {/* <CustomLabelLarge>Start Rendering</CustomLabelLarge> */}
      <CustomLabel>Start Rendering</CustomLabel>
      <Inputs>
        <BlendFileUploadSection
          baseUrl={baseUrl}
          refreshExecutionData={refreshExecutionData}
        />

        <Section>
          <CustomLabelDim>Type</CustomLabelDim>

          <AnimatedPillTabs
            containerStyle={tabContainerStyle}
            pillStyle={pillStyle}
            value={renderSettings.renderType}
            onChange={onChange("renderType")}
            tabs={typeTabs}
          />

          {renderSettings.renderType == "RANGE" && (
            <RangeInput>
              <MaterialInput
                style={pillStyle}
                label="Start Frame"
                type="number"
                value={renderSettings.rangeStart}
                onTextChange={onChange("rangeStart")}
              />
              <MaterialInput
                style={pillStyle}
                label="End Frame"
                type="number"
                value={renderSettings.rangeEnd}
                onTextChange={onChange("rangeEnd")}
              />
            </RangeInput>
          )}

          {renderSettings.renderType == "IMAGE" && (
            <MaterialInput
              style={pillStyle}
              label="Frame"
              type="number"
              value={renderSettings.imageFrame}
              onTextChange={onChange("imageFrame")}
            />
          )}
        </Section>

        <Section>
          <CustomLabelDim>Engine</CustomLabelDim>

          <AnimatedPillTabs
            containerStyle={tabContainerStyle}
            pillStyle={pillStyle}
            value={renderSettings.engineType}
            onChange={onChange("engineType")}
            tabs={engineTabs}
          />
        </Section>

        {/* I am removing the option to select between OPTIX and CUDA because
for RTX based cards, OPTIX is always faster */}

        <Section>
          <CustomLabelDim>Method</CustomLabelDim>

          <AnimatedPillTabs
            containerStyle={tabContainerStyle}
            pillStyle={pillStyle}
            value={renderSettings.methodType}
            onChange={onChange("methodType")}
            tabs={methodTabs}
          />
        </Section>
      </Inputs>

      <CustomPrimaryButton
        style={{
          width: "180px",
          height: "55px",
          padding: "0",
          borderRadius: "25px",
          gap: "25px",
        }}
      >
        Start
        {/* <PiComputerTower /> */}
        <GoArrowRight />
      </CustomPrimaryButton>
    </Container>
  );

  function onChange(field) {
    return (newVal) => {
      let newConfig = { ...renderSettings };
      newConfig[field] = newVal;
      setRenderSettings(newConfig);
    };
  }
}
