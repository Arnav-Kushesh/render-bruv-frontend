import { useContext, useEffect, useState } from "react";

import MaterialInput from "../../../helperComponents/MaterialInput";
import styled from "styled-components";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";
import CustomButton from "../../../helperComponents/CustomButton";
import { BiPlus } from "react-icons/bi";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import LoadingSection from "../../../helperComponents/LoadingSection";
import LoggedInBoilerplate from "../LoggedInBoilerplate";
import PrimaryButton from "../../../helperComponents/PrimaryButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
  width: 100%;
`;

const Center = styled.div`
  width: 38vw;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;

  @media (max-width: 900px) {
    width: 100%;
    margin: 0;
  }
`;

const SectionRow1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

export default function ManageModeratorList() {
  const { loggedInUser } = useContext(Context);

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loggedInUser) {
      serverLine.get("/admin-data/?type=MODERATOR_LIST").then((newData) => {
        if (newData)
          if (newData.data) {
            setItems(newData.data);
          }

        setLoading(false);
      });
    }
  }, []);

  let comp = null;

  if (loading || !items) {
    comp = <LoadingSection />;
  } else {
    comp = (
      <Center>
        {items.map((item, index) => {
          return (
            <SectionRow1>
              <MaterialInput
                label={"Moderator Email"}
                value={item}
                onChange={updateField(index)}
              />
              <CustomButton
                onClick={removeItem(index)}
                icon={<MdDeleteOutline />}
              />
            </SectionRow1>
          );
        })}

        <SectionRow1>
          <CustomButton onClick={addItem} icon={<BiPlus />}>
            Add Item
          </CustomButton>

          <PrimaryButton onClick={onSubmit} icon={<MdDone />}>
            Save
          </PrimaryButton>
        </SectionRow1>
      </Center>
    );
  }

  return (
    <LoggedInBoilerplate titleLine1={"Manage"} titleLine2={"Moderator List"}>
      <Container>{comp}</Container>
    </LoggedInBoilerplate>
  );

  function updateField(index) {
    return (e) => {
      let newData = [...items];

      newData[index] = e.target.value;

      setItems(newData);
    };
  }

  function removeItem(index) {
    return () => {
      let newData = [...items];

      newData.splice(index, 1);

      setItems(newData);
    };
  }

  function addItem() {
    let newData = [...items];

    newData.push("");

    setItems(newData);
  }

  async function onSubmit() {
    setLoading(true);

    try {
      await serverLine.post("/admin-data", {
        data: items,
        type: "MODERATOR_LIST",
      });
      setLoading(false);

      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
