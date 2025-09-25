import { useContext, useState } from "react";
import styled from "styled-components";
import Context from "../../../../Context";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import CustomButton from "../../../helperComponents/CustomButton";
import { BiLogoBlender, BiUpload } from "react-icons/bi";
import AnimatedPillTabs from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";
import MaterialInput from "../../../helperComponents/MaterialInput";
import CustomLabelDim from "../../../applicationUI/CustomLabelDim";
import CustomLabelLarge from "../../../applicationUI/CustomLabelLarge";
import { GoArrowRight } from "react-icons/go";
import { SiBlender } from "react-icons/si";
import { PiComputerTower } from "react-icons/pi";
import CustomLabel from "../../../applicationUI/CustomLabel";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: var(--surface);
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

let pillStyle = null;

export default function StartRenderingPanel() {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  const [title, setTitle] = useState("");
  const [gpuType, setGpuType] = useState("GTX_4090");
  const [type, setType] = useState("IMAGE");
  const [engineType, setEngineType] = useState("CYCLES");
  const [methodType, setMethodType] = useState("CUDA");

  const [imageFrame, setImageFrame] = useState(0);
  const [rangeStart, setRangeStart] = useState(0);
  const [rangeEnd, setRangeEnd] = useState(100);

  return (
    <Container>
      {/* <CustomLabelLarge>Start Rendering</CustomLabelLarge> */}
      <CustomLabel>Start Rendering</CustomLabel>
      <Inputs>
        <CustomButton
          style={{
            border: "1px solid var(--elementDim2)",
            borderRadius: "15px",
            background: "transparent",
            padding: "15px 35px",
          }}
          icon={<SiBlender />}
        >
          Upload Blender File
        </CustomButton>

        <Section>
          <CustomLabelDim>Type</CustomLabelDim>

          <AnimatedPillTabs
            containerStyle={tabContainerStyle}
            pillStyle={pillStyle}
            value={type}
            onChange={setType}
            tabs={typeTabs}
          />

          {type == "RANGE" && (
            <RangeInput>
              <MaterialInput
                style={pillStyle}
                label="Start Frame"
                type="number"
                value={rangeStart}
                onTextChange={setRangeStart}
              />
              <MaterialInput
                style={pillStyle}
                label="End Frame"
                type="number"
                value={rangeEnd}
                onTextChange={setRangeEnd}
              />
            </RangeInput>
          )}

          {type == "IMAGE" && (
            <MaterialInput
              style={pillStyle}
              label="Frame"
              type="number"
              value={imageFrame}
              onTextChange={setImageFrame}
            />
          )}
        </Section>

        <Section>
          <CustomLabelDim>Engine</CustomLabelDim>

          <AnimatedPillTabs
            containerStyle={tabContainerStyle}
            pillStyle={pillStyle}
            value={engineType}
            onChange={setEngineType}
            tabs={engineTabs}
          />
        </Section>

        <Section>
          <CustomLabelDim>Method</CustomLabelDim>

          <AnimatedPillTabs
            containerStyle={tabContainerStyle}
            pillStyle={pillStyle}
            value={methodType}
            onChange={setMethodType}
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
}
