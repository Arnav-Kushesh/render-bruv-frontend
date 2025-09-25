import { useState } from "react";
import MaterialInput from "../../helperComponents/MaterialInput";
import extractEventValue from "../../../controllers/utils/extractEventValue";
import InputCard from "../../helperComponents/InputCard";
import CustomButton from "../../helperComponents/CustomButton";
import { serverLine } from "../../../controllers/network/serverLine";
import logout from "../../../controllers/logout";
import LoadingSection from "../../helperComponents/LoadingSection";

export default function DeleteAccount() {
  const [reason, setReason] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  const [loading, setLoading] = useState(false);



  let core = null;

  if (requestSent) {
    core = (
      <>
        <MaterialInput
          label={"Confirmation Code"}
          value={confirmationCode}
          onChange={extractEventValue(setConfirmationCode)}
        />
        <CustomButton onClick={confirmAccountDeletion}>Submit</CustomButton>
      </>
    );
  } else {
    core = (
      <>
        <MaterialInput
          label={"Reason"}
          value={reason}
          onChange={extractEventValue(setReason)}
        />
        <CustomButton onClick={submitReason}>Submit</CustomButton>
      </>
    );
  }

  if (loading) core = <LoadingSection />;

  return <InputCard title="Account Deletion Page">{core}</InputCard>;

  async function submitReason() {
    setLoading(true);
    await serverLine.post("/request-account-deletion", { reason });
    setRequestSent(true);
    setLoading(false);
  }

  async function confirmAccountDeletion() {
    setLoading(true);
    try {
      await serverLine.post("/confirm-account-deletion", {
        code: confirmationCode,
      });
      logout();
    } catch (e) {
      window.popupAlert(e.message);
    }
    setLoading(false);
  }
}
