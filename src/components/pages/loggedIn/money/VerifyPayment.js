import { useEffect, useState } from "react";
import getUrlQuery from "../../../../controllers/getUrlQuery";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import LoadingSection from "../../../helperComponents/LoadingSection";
import styled from "styled-components";
import { serverLine } from "../../../../controllers/network/serverLine";
import goTo from "../../../../controllers/goTo";
import MessageBox from "../../../helperComponents/MessageBox";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  width: 100%;
`;

export default function VerifyPayment() {
  const [error, setError] = useState("");
  useEffect(() => {
    doVerification();
  }, []);

  if (error)
    return (
      <LoggedInBoilerplate>
        <Center>
          <MessageBox>{error}</MessageBox>
        </Center>
      </LoggedInBoilerplate>
    );
  return (
    <LoggedInBoilerplate>
      <Center>
        <LoadingSection />
      </Center>
    </LoggedInBoilerplate>
  );

  async function doVerification() {
    let paymentId = getUrlQuery("payment_id");

    try {
      let data = await serverLine.post("/verify-payment", { paymentId });

      if (data.amountInCents)
        goTo(`/payment-done/?amountInCents=${data.amountInCents}`)();
    } catch (e) {
      window.popupAlert(e.message);
      setError(e.message);
    }
  }
}
