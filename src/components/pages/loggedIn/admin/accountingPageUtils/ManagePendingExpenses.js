import { useState } from "react";
import styled from "styled-components";
import ElevatedSection from "../../../../helperComponents/general/ElevatedSection";
import MiniGapColumn from "../../../../helperComponents/general/MiniGapColumn";
import CustomLabelHeading from "../../../../applicationUI/customLabel/CustomLabelHeading";
import CustomLabel from "../../../../applicationUI/customLabel/CustomLabel";
import GeneralGapColumn from "../../../../helperComponents/general/GeneralGapColumn";
import CustomPrimaryButton from "../../../../helperComponents/CustomPrimaryButton";
import { serverLine } from "../../../../../controllers/network/serverLine";
import CompanyTransactionAggregator from "../../../../applicationUI/aggregator/CompanyTransactionAggregator";
import CustomAnimatedInput from "../../../../helperComponents/CustomAnimatedInput";
import LoadingSection from "../../../../helperComponents/LoadingSection";
import CustomLabelSmall from "../../../../applicationUI/customLabel/CustomLabelSmall";
import CustomLabelExtraSmall from "../../../../applicationUI/customLabel/CustomLabelExtraSmall";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export default function ManagePendingExpenses({ latestTransaction, refresh }) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState();

  let pendingExpenses = 0;

  if (latestTransaction)
    if (latestTransaction.pendingExpenses)
      pendingExpenses = latestTransaction.pendingExpenses;

  if (loading)
    return (
      <Column>
        <LoadingSection />
      </Column>
    );

  return (
    <Column>
      <ElevatedSection>
        <MiniGapColumn>
          <CustomLabelHeading> ${pendingExpenses / 100} </CustomLabelHeading>
          <CustomLabel>Pending Expense</CustomLabel>
        </MiniGapColumn>
      </ElevatedSection>

      <ElevatedSection>
        <GeneralGapColumn>
          <CustomLabel>Deduct Expense</CustomLabel>

          <CustomAnimatedInput
            value={amount}
            type="number"
            onTextChange={setAmount}
          />

          <CustomLabelExtraSmall>
            Note : The pending expenses amount might have changed since this
            page was last loaded.
          </CustomLabelExtraSmall>

          <CustomLabelExtraSmall>
            Note : Right after pressing submit, you must transfer the amount to
            runpod from the main bank account, otherwise it might create
            accounting issues
          </CustomLabelExtraSmall>

          <CustomPrimaryButton style={{ width: "150px" }} onClick={doIt}>
            Submit
          </CustomPrimaryButton>
          <br />
        </GeneralGapColumn>
      </ElevatedSection>

      <ElevatedSection>
        <CustomLabel>Expense Deposit</CustomLabel>
        <CompanyTransactionAggregator
          typeOverride={"EXPENSE_DEPOSIT"}
          disableFilters={true}
          hideTitleSection={true}
          viewMode={"CARD"}
        />
      </ElevatedSection>
    </Column>
  );

  async function doIt() {
    setLoading(true);

    await serverLine.post("/deduct-pending-expenses", {
      amountInCents: amount * 100,
    });
    await refresh();
    setLoading(false);
  }
}
