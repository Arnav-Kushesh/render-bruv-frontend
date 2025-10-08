import { useEffect, useState } from "react";
import LoggedInBoilerplate from "../../LoggedInBoilerplate";
import LoadingSection from "../../../../helperComponents/LoadingSection";
import styled from "styled-components";
import ManageWithdrawableAmount from "../accountingPageUtils/ManageWithdrawableAmount";
import ManageBillingPage from "../../billingPage/ManageBillingPage";
import { serverLine } from "../../../../../controllers/network/serverLine";
import ManagePendingExpenses from "../accountingPageUtils/ManagePendingExpenses";
import MaxGapColumn from "../../../../helperComponents/general/MaxGapColumn";
import CustomLabelDim from "../../../../applicationUI/customLabel/CustomLabelDim";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  /* padding: 20px; */
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default function AdminAccounting() {
  const [latestTransactions, setLatestTransactions] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    doQuery();
  }, []);

  let latestTransaction = null;

  if (latestTransactions) latestTransaction = latestTransactions[0];

  if (loading) return <LoadingSection />;

  return (
    <MaxGapColumn>
      <Row>
        <ManageWithdrawableAmount
          refresh={doQuery}
          latestTransaction={latestTransaction}
        />
        <ManagePendingExpenses
          refresh={doQuery}
          latestTransaction={latestTransaction}
        />
      </Row>

      <br />
      <CustomLabelDim>
        Responsibility Rotation for recharging RunPod and deducting pending
        expenses. Arnav (Sun, Mon, Tue), Rishabh (Wed, Thu), Nikhil (Fri, Sat).
        This will avoid a scenario in which two individuals make the same change
        at the same time, making accounting go haywire.
      </CustomLabelDim>
    </MaxGapColumn>
  );

  async function doQuery() {
    setLoading(true);

    let data = await serverLine.get("/company-transactions");
    setLatestTransactions(data.list);

    setLoading(false);
  }
}
