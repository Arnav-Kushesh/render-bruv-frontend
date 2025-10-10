import { useContext, useState } from "react";
import styled from "styled-components";

import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import FileCard from "./FileCard";
import { BiDownload, BiStop } from "react-icons/bi";
import Context from "../../../../Context";
import LoadingSection from "../../../helperComponents/LoadingSection";
import { serverLine } from "../../../../controllers/network/serverLine";
import { RiIndeterminateCircleLine } from "react-icons/ri";
import terminateSocketConnection from "./controllers/terminateSocketConnection";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  width: 100%;
  border-radius: 10px;
  padding: 40px;
  padding-bottom: 70px;
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

const Items = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

export default function InstanceLastSection({ itemId, loadData, podId }) {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  const [loading, setLoading] = useState("");
  const [gpuType, setGpuType] = useState("GTX_4090");

  if (loading)
    return (
      <Container>
        <LoadingSection />
      </Container>
    );

  return (
    <Container>
      <CustomLabel>Terminate Instance</CustomLabel>

      <CustomPrimaryButton
        onClick={terminateInstance}
        style={{ width: "330px", height: "60px" }}
      >
        <RiIndeterminateCircleLine />
        Terminate Instance
      </CustomPrimaryButton>
    </Container>
  );

  async function terminateInstance() {
    setLoading(true);

    terminateSocketConnection(podId);

    await serverLine.post("/stop-server-instance", { itemId });

    setLoading(false);

    loadData();
  }
}
