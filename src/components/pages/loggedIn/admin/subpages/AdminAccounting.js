import { useState } from "react";
import LoggedInBoilerplate from "../../LoggedInBoilerplate";
import LoadingSection from "../../../../helperComponents/LoadingSection";
import styled from "styled-components";
import ManageWithdrawableAmount from "../accountingPageUtils/ManageWithdrawableAmount";
import ManageBillingPage from "../../billingPage/ManageBillingPage";
import { serverLine } from "../../../../../controllers/network/serverLine";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export default function AdminAccounting() {
  const [latestTransactions, setLatestTransactions] = useState(null);
  const [loading, setLoading] = useState(false);

  let latestTransaction = null;

  if (latestTransactions) latestTransaction = latestTransactions[0];

  if (loading)
    return (
      <LoggedInBoilerplate>
        <LoadingSection />
      </LoggedInBoilerplate>
    );

  return (
    <LoggedInBoilerplate>
      <Row>
        <ManageWithdrawableAmount
          refresh={doQuery}
          latestTransaction={latestTransaction}
        />
        <ManageBillingPage
          refresh={doQuery}
          latestTransaction={latestTransaction}
        />
      </Row>
    </LoggedInBoilerplate>
  );

  async function doQuery() {
    setLoading(true);

    let data = await serverLine.get("/company-transactions");
    setLatestTransactions(data.list);

    setLoading(false);
  }
}
