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

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default function ManagePendingExpenses({ latestTransaction, refresh }) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState();

  let withdrawableAmount = 0;

  if (latestTransaction.withdrawableAmount)
    withdrawableAmount = latestTransaction.withdrawableAmount;

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
          <CustomLabelHeading> ${withdrawableAmount} </CustomLabelHeading>
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

          <CustomLabelSmall>
            Note : The pending expenses amount might have changed since this
            page was last loaded.
          </CustomLabelSmall>

          <CustomLabelSmall>
            Note : Right after pressing submit, you must transfer the amount to
            runpod from the main bank account, otherwise it might create
            accounting issues
          </CustomLabelSmall>

          <CustomPrimaryButton onClick={doIt}>Submit</CustomPrimaryButton>
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
