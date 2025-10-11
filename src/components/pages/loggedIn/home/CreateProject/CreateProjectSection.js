import styled from "styled-components";
import { useContext, useState } from "react";
import Context from "../../../../../Context";
import CustomLabel from "../../../../applicationUI/customLabel/CustomLabel";
import extractEventValue from "../../../../../controllers/utils/extractEventValue";
import CustomAnimatedInput from "../../../../helperComponents/CustomAnimatedInput";
import CustomPrimaryButton from "../../../../helperComponents/CustomPrimaryButton";
import GpuTypeSelector from "./GpuTypeSelector";
import LoadingSection from "../../../../helperComponents/LoadingSection";
import { serverLine } from "../../../../../controllers/network/serverLine";
import goTo from "../../../../../controllers/goTo";
import CustomButton from "../../../../helperComponents/CustomButton";
import { MdMoney, MdPayment } from "react-icons/md";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow2);
  width: 100%;
  border-radius: 10px;
  padding: 40px;

  @media (max-width: 900px) {
    width: 100%;
    padding: 25px;
    padding-bottom: 50px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 500px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
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

const BalanceMiniCard = styled.div`
  background: var(--surface);
  padding: 15px 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  font-weight: 500;
  gap: 5px;
  font-size: 15px;
  height: 50px;
`;

const BalanceLabel = styled.div``;

const BalanceValue = styled.div`
  font-weight: 700;
`;

export default function CreateProjectSection() {
  const { loggedInUser, isMobile } = useContext(Context);

  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [gpuId, setGpuId] = useState(null);

  let currentBalance = 0;

  if (loggedInUser.currentBalanceInCents) {
    currentBalance = loggedInUser.currentBalanceInCents / 100;
  }

  return (
    <MainContainer>
      <TopRow>
        <BalanceMiniCard>
          <BalanceLabel>Balance:</BalanceLabel>

          <BalanceValue>${currentBalance}</BalanceValue>
        </BalanceMiniCard>

        <CustomButton
          style={{ borderRadius: "15px", height: "50px" }}
          onClick={goTo("/manage-billing")}
          icon={<MdPayment />}
        >
          Recharge
        </CustomButton>
      </TopRow>
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
          <CustomPrimaryButton
            onClick={createProject}
            style={{ width: "250px" }}
          >
            Create Instance
          </CustomPrimaryButton>
        )}
      </Container>
    </MainContainer>
  );

  async function createProject() {
    if (!gpuId) return window.popupAlert("Please! select the gpu");
    if (!projectName) return window.popupAlert("Please! input project name");
    if (!projectName.length)
      return window.popupAlert("Please! input project name");

    try {
      setLoading(true);

      let data = await serverLine.post("/create-server-instance", {
        gpuId,
        projectName,
      });

      let { serverInstance } = data;

      goTo(`/manage-instance/${serverInstance._id}`)();

      setLoading(false);
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
