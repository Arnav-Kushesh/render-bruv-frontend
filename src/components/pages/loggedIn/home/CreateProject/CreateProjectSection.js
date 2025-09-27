import styled from "styled-components";
import { useContext, useState } from "react";
import Context from "../../../../../Context";
import CustomLabel from "../../../../applicationUI/CustomLabel";
import extractEventValue from "../../../../../controllers/utils/extractEventValue";
import CustomAnimatedInput from "../../../../helperComponents/CustomAnimatedInput";
import CustomPrimaryButton from "../../../../helperComponents/CustomPrimaryButton";
import GpuTypeSelector from "./GpuTypeSelector";
import LoadingSection from "../../../../helperComponents/LoadingSection";
import { serverLine } from "../../../../../controllers/network/serverLine";
import goTo from "../../../../../controllers/goTo";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  width: 500px;
  border-radius: 10px;
  padding: 40px;

  @media (max-width: 900px) {
    width: 100%;
    padding: 25px;
    padding-bottom: 50px;
  }
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

export default function CreateProjectSection() {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [gpuId, setGpuId] = useState("RTX_4090");

  return (
    <Container>
      <CustomLabel>Create Project</CustomLabel>

      <Inputs>
        <CustomAnimatedInput
          style={{ width: isMobile ? "100%" : "400px" }}
          placeholder="Type Project Name Here"
          value={projectName}
          onChange={extractEventValue(setProjectName)}
        ></CustomAnimatedInput>

        <GpuTypeSelector value={gpuId} onChange={setGpuId} />
      </Inputs>

      {/* <PrimaryButton style={{ width: "300px" }}>Create Instance</PrimaryButton> */}

      {loading ? (
        <LoadingSection />
      ) : (
        <CustomPrimaryButton onClick={createProject} style={{ width: "250px" }}>
          Create Instance
        </CustomPrimaryButton>
      )}
    </Container>
  );

  async function createProject() {
    setLoading(true);

    let data = await serverLine.post("/create-server-instance", {
      gpuId,
      projectName,
    });

    let { serverInstance } = data;

    goTo(`/manage-instance/${serverInstance._id}`)();

    setLoading(false);
  }
}
