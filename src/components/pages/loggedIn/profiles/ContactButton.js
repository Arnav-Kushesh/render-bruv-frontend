import { useContext } from "react";
import PrimaryButton from "../../../helperComponents/PrimaryButton";
import Context from "../../../../Context";
import styled from "styled-components";
import { IoCall } from "react-icons/io5";
import ContactInfo from "./ContactInfo";

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

export default function ContactButton({ item }) {
  const { setForm } = useContext(Context);

  return (
    <PrimaryButton
      style={{ flexDirection: "row", minWidth: "55px" }}
      icon={<IoCall />}
      onClick={openUI}
    ></PrimaryButton>
  );

  function openUI() {
    setForm({ title: "Contact Info", component: <ContactInfo item={item} /> });
  }
}
