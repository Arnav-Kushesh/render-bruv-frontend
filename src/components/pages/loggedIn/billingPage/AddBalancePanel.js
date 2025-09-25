import { useContext, useState } from "react";
import styled from "styled-components";
import Context from "../../../../Context";
import CustomPrimaryButton from "../../../helperComponents/CustomPrimaryButton";
import CustomButton from "../../../helperComponents/CustomButton";
import AnimatedPillTabs from "../../loggedOut/landingPage/loggedOutHomeForApp/AnimatedPillTabs";
import MaterialInput from "../../../helperComponents/MaterialInput";
import CustomLabelDim from "../../../applicationUI/CustomLabelDim";
import { GoArrowRight } from "react-icons/go";
import { SiBlender } from "react-icons/si";
import CustomLabel from "../../../applicationUI/CustomLabel";
import { MdPayment } from "react-icons/md";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  /* width: 410px; */
  border-radius: 10px;
  padding: 35px;
  padding-bottom: 60px;
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
  /* margin-bottom: 20px; */
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

let typeTabs = [
  { value: 5, label: "$5" },
  { value: 10, label: "$10" },
  { value: 100, label: "$100" },
  { value: "CUSTOM", label: "Custom" },
];

const RangeInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

let tabContainerStyle = {
  border: "1px solid var(--borderIntense)",
  borderRadius: "10px",
  background: "transparent",
};

let pillStyle = null;

export default function AddBalancePanel() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState(0);

  return (
    <Container>
      <CustomLabel>Add Balance</CustomLabel>
      <Inputs>
        <Section>
          <CustomLabelDim>Choose Amount</CustomLabelDim>

          <AnimatedPillTabs
            containerStyle={tabContainerStyle}
            pillStyle={pillStyle}
            value={amount}
            onChange={setAmount}
            tabs={typeTabs}
          />

          {amount == "CUSTOM" && (
            <MaterialInput
              label="Custom Amount"
              type="number"
              value={customAmount}
              onTextChange={setCustomAmount}
            />
          )}
        </Section>
      </Inputs>

      <CustomPrimaryButton
        style={{
          width: "180px",
          height: "50px",
          padding: "0",
          borderRadius: "25px",
          gap: "25px",
        }}
      >
        Pay
        <MdPayment />
      </CustomPrimaryButton>
    </Container>
  );
}
