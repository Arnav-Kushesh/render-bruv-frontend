import { useContext, useState } from "react";
import styled from "styled-components";

import CustomLabel from "../../../applicationUI/customLabel/CustomLabel";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import { BiDownload } from "react-icons/bi";
import Context from "../../../../Context";
import UsageHistoryItem from "./UsageHistoryItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: var(--surface);
  border: 1px solid var(--border);
  flex: 1;
  border-radius: 10px;
  padding: 30px;
  padding-bottom: 70px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

export default function UsageHistory() {
  const { updateLoggedInUser, loggedInUser, isMobile } = useContext(Context);

  const [title, setTitle] = useState("");
  const [gpuType, setGpuType] = useState("GTX_4090");

  return (
    <Container>
      <CustomLabel>Usage History</CustomLabel>

      <Items>
        <UsageHistoryItem />
        <UsageHistoryItem />
        <UsageHistoryItem />
        <UsageHistoryItem />
      </Items>

      <CustomPrimaryButton
        style={{ width: "160px", height: "40px", boxShadow: "unset" }}
      >
        Load More
      </CustomPrimaryButton>
    </Container>
  );
}
