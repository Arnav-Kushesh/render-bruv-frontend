import { useContext, useState } from "react";
import styled from "styled-components";
import Context from "../../../../Context";
import CustomLabel from "../../../applicationUI/CustomLabel";
import CustomAnimatedInput from "../../../helperComponents/CustomAnimatedInput";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import GpuTypeSelector from "../home/CreateProject/GpuTypeSelector";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import { MdMovie, MdOutlineMovie } from "react-icons/md";
import CustomLabelDim from "../../../applicationUI/CustomLabelDim";

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

const EmptyStateText = styled.div``;

export default function LivePreviewPanel() {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  const [title, setTitle] = useState("");
  const [gpuType, setGpuType] = useState("GTX_4090");

  let core = (
    <EmptyState>
      <EmptyStateIcon>
        <MdOutlineMovie />
      </EmptyStateIcon>

      <CustomLabelDim>Live preview will be shown here</CustomLabelDim>
    </EmptyState>
  );

  return (
    <Container>
      <CustomLabel>Live Preview</CustomLabel>

      {core}
    </Container>
  );
}
