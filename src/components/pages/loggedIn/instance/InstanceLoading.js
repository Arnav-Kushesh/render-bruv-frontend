import { useEffect, useState } from "react";
import SphereAnimation from "../../../animations/SphereAnimation";
import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import ElevatedSection from "../../../helperComponents/general/ElevatedSection";
import ProgressBar from "../../../animations/ProgressBar";
import styled from "styled-components";
import CustomLabelSmall from "../../../applicationUI/customLabel/CustomLabelSmall";
import CustomLabelExtraSmall from "../../../applicationUI/customLabel/CustomLabelExtraSmall";
import RiveLoadingAnimation from "../../../animations/RiveLoadingAnimation";
import Rive3dCube from "../../../animations/Rive3dCube";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

export default function InstanceLoading() {
  return (
    <ElevatedSection style={{ alignItems: "center", padding: "0 100px" }}>
      {/* <SphereAnimation /> */}
      {/* <RiveLoadingAnimation /> */}
      {/* <Rive3dCube /> */}
      <br />
      <ProgressBar />
      <Column>
        <CustomLabelSmall>
          Please! wait server is being initialized. It generally takes 2 minutes
        </CustomLabelSmall>
        <CustomLabelExtraSmall>
          Installing drivers & configurations...
        </CustomLabelExtraSmall>
      </Column>
      <br />
    </ElevatedSection>
  );
}
