import styled from "styled-components";
import ProgressBar from "../../../animations/ProgressBar";
import ElevatedSection from "../../../helperComponents/general/ElevatedSection";
import CustomLabelSmall from "../../../applicationUI/customLabel/CustomLabelSmall";
import CustomLabelExtraSmall from "../../../applicationUI/customLabel/CustomLabelExtraSmall";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

export default function RenderProgressBarSection({ desc }) {
  return (
    <ElevatedSection style={{ alignItems: "center", padding: "0 100px" }}>
      {/* <SphereAnimation /> */}
      {/* <RiveLoadingAnimation /> */}
      {/* <Rive3dCube /> */}
      <br />
      <ProgressBar />
      <Column>
        <CustomLabelSmall>We are processing the request</CustomLabelSmall>
        <CustomLabelExtraSmall>{desc}</CustomLabelExtraSmall>
      </Column>
      <br />
    </ElevatedSection>
  );
}
