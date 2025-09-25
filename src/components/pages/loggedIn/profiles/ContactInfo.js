import { useContext } from "react";
import PrimaryButton from "../../../helperComponents/PrimaryButton";
import Context from "../../../../Context";
import { FaDonate } from "react-icons/fa";
import styled from "styled-components";
import { IoCall, IoCallOutline } from "react-icons/io5";
import CustomLabel from "../../../applicationUI/CustomLabel";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Line = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
`;

const Lhs = styled.div`
  font-weight: 700;
`;

const Rhs = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--element);
  padding: 35px;
`;

export default function ContactInfo({ item }) {
  let component = <CustomLabel>No contact info available</CustomLabel>;

  component = (
    <Line>
      <Rhs>{item.phoneNumber}</Rhs>
    </Line>
  );

  return <Container>{component}</Container>;
}
