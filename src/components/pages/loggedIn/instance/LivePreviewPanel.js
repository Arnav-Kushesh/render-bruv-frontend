import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Context from "../../../../Context";
import CustomLabel from "../../../applicationUI/CustomLabel";
import CustomAnimatedInput from "../../../helperComponents/CustomAnimatedInput";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import GpuTypeSelector from "../home/CreateProject/GpuTypeSelector";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import { MdMovie, MdOutlineMovie } from "react-icons/md";
import CustomLabelDim from "../../../applicationUI/CustomLabelDim";
import getSocketConnection from "./controllers/getSocketConnection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  flex: 1;
  height: 712.5px;
  border-radius: 10px;
  padding: 40px;
  overflow: hidden;
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

const EmptyState = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const EmptyStateIcon = styled.div`
  font-size: 25px;
  opacity: 0.5;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 25px;
  width: 100%;
  flex: 1;
`;

const LiveImage = styled.img`
  /* width: 100%; */
  display: flex;
  border-radius: 10px;
  /* width: 70%; */
  /* height: auto; */

  height: 500px;
  width: auto;
  /* object-fit: contain; */
`;

// const RenderStat = s

export default function LivePreviewPanel({
  podId,
  baseUrl,
  refreshExecutionData,
}) {
  const [liveImage, setLiveImage] = useState();
  const [renderStat, setRenderStat] = useState();

  useEffect(() => {
    let socket = getSocketConnection({ podId, baseUrl });

    socket.on("live_base64", receivedLiveImage);
    socket.on("render_stats", receivedRenderStat);
  }, []);

  let core = (
    <EmptyState>
      <EmptyStateIcon>
        <MdOutlineMovie />
      </EmptyStateIcon>

      <CustomLabelDim>Live preview will be shown here</CustomLabelDim>
    </EmptyState>
  );

  if (liveImage || renderStat) {
    core = (
      <Section>
        {liveImage && <LiveImage src={liveImage} />}

        {renderStat && (
          <CustomLabelDim style={{ fontSize: "13px" }}>
            {renderStat}
          </CustomLabelDim>
        )}
      </Section>
    );
  }

  return (
    <Container>
      <CustomLabel>Live Preview</CustomLabel>

      {core}
    </Container>
  );

  function receivedLiveImage(res) {
    setLiveImage(res.image_string);
  }

  function receivedRenderStat(res) {
    if (res.render_stats != "") {
      setRenderStat(res.render_stats);
    }
    if (res.render_stats === "Blender quit") {
      refreshExecutionData();
    }
  }
}
