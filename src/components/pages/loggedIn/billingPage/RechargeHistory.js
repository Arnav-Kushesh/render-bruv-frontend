import { useContext, useState } from "react";
import styled from "styled-components";

import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import FileCard from "./RechargeHistoryItem";
import { BiDownload } from "react-icons/bi";
import Context from "../../../../Context";
import RechargeHistoryItem from "./RechargeHistoryItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  width: 100%;
  border-radius: 10px;
  padding: 30px;
  flex: 1;
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
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
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

export default function RechargeHistory() {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  const [title, setTitle] = useState("");
  const [gpuType, setGpuType] = useState("GTX_4090");

  return (
    <Container>
      <CustomLabel>Recharge History</CustomLabel>

      <Items>
        <RechargeHistoryItem />
        <RechargeHistoryItem />
        <RechargeHistoryItem />
        <RechargeHistoryItem />
      </Items>

      <CustomPrimaryButton
        style={{ width: "130px", height: "40px", boxShadow: "unset" }}
      >
        Load More
      </CustomPrimaryButton>
    </Container>
  );
}
