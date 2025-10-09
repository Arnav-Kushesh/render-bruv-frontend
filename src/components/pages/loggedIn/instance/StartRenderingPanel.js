import { useContext, useState } from "react";
import styled from "styled-components";
import Context from "../../../../Context";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import CustomButton from "../../../helperComponents/CustomButton";
import { BiLogoBlender, BiUpload } from "react-icons/bi";
import AnimatedPillTabs from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";
import MaterialInput from "../../../helperComponents/MaterialInput";
import CustomLabelDim from "../../../applicationUI/customLabel/CustomLabelDim";
import CustomLabelLarge from "../../../applicationUI/customLabel/CustomLabelLarge";
import { GoArrowRight } from "react-icons/go";
import { SiBlender } from "react-icons/si";
import { PiComputerTower } from "react-icons/pi";
import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import BlendFileUploadSection from "./BlendFileUploadSection";
import startRender from "./controllers/startRender";
import stopRender from "./controllers/stopRender";

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

const Section1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--surface);
  border: 1px solid var(--border);
  width: 410px;
  border-radius: 10px;
  padding: 25px 35px;
  /* padding-bottom: 60px; */
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
  gap: 22px;
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
  gap: 10px;
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
  { value: "CUDA", label: "Cuda" },
  { value: "OPTIX", label: "Optix" },
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

let pillStyle = { borderRadius: "10px" };

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Part = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export default function StartRenderingPanel({
  renderSettings,
  setRenderSettings,
  baseUrl,
  refreshExecutionData,
  executionData,
  podId,
}) {
  let isRendering = executionData?.render_status?.is_rendering;
  return (
    <Column>
      <Section1>
        <CustomLabelDim>Step 1. Upload File</CustomLabelDim>
        <BlendFileUploadSection
          baseUrl={baseUrl}
          executionData={executionData}
          refreshExecutionData={refreshExecutionData}
        />
      </Section1>

      <Container>
        <CustomLabelDim>Step 2. Configure</CustomLabelDim>
        <Inputs>
          <Section>
            {/* <CustomLabelDim>Type</CustomLabelDim> */}

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
            {/* <CustomLabelDim>Engine</CustomLabelDim> */}

            <AnimatedPillTabs
              containerStyle={tabContainerStyle}
              pillStyle={pillStyle}
              value={renderSettings.engineType}
              onChange={onChange("engineType")}
              tabs={engineTabs}
            />
          </Section>

          <Section>
            {/* <CustomLabelDim>Method</CustomLabelDim> */}

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
          onClick={go}
          style={{
            width: "180px",
            height: "55px",
            padding: "0",
            borderRadius: "25px",
            gap: "25px",
          }}
        >
          {isRendering ? "Stop" : "Start"}
          {/* <PiComputerTower /> */}
          <GoArrowRight />
        </CustomPrimaryButton>
      </Container>
    </Column>
  );

  function go() {
    if (isRendering) {
      stop();
    } else {
      start();
    }
  }

  function start() {
    console.log("Starting render");
    startRender({ podId, baseUrl, renderSettings, executionData });
  }

  function stop() {
    console.log("Stopping render");
    stopRender({ podId, baseUrl, refreshExecutionData, executionData });
  }

  function onChange(field) {
    return (newVal) => {
      let newConfig = { ...renderSettings };
      newConfig[field] = newVal;
      setRenderSettings(newConfig);
    };
  }
}
