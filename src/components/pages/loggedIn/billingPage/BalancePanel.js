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
  /* width: 410px; */
  border-radius: 10px;
  padding: 35px;
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

const Amount = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: var(--elementDim);
`;

const Span = styled.span`
  font-weight: 700;
  color: var(--element);
`;

export default function BalancePanel() {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  return (
    <Container>
      <Amount>
        Balance: <Span>$100</Span>
      </Amount>
    </Container>
  );
}
