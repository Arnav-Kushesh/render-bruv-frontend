import { useState } from "react";
import LoadingSection from "../helperComponents/LoadingSection";
import CustomLabel from "./customLabel/CustomLabel";
import styled from "styled-components";
import { serverLine } from "../../controllers/network/serverLine";
import goTo from "../../controllers/goTo";
import CustomButton from "../helperComponents/CustomButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 50px;
  padding-bottom: 50px;
  gap: 30px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export default function DeleteItemPopup({ itemId, itemType, callback }) {
  const [loading, setLoading] = useState(false);

  if (loading)
    return (
      <Container>
        <LoadingSection />
      </Container>
    );

  return (
    <Container>
      <CustomLabel>
        Are you sure, you want to delete the selected item?
      </CustomLabel>

      <Buttons>
        <CustomButton onClick={postDelete}>Yes</CustomButton>
        <CustomButton onClick={goTo(-1)}>No</CustomButton>
      </Buttons>
    </Container>
  );

  async function postDelete() {
    setLoading(true);

    try {
      await serverLine.post("/delete", { itemId, itemType });
      goTo(-1)();

      if (callback) {
        callback();
      } else {
        window.popupAlert("Deleted");
      }
    } catch (e) {
      window.popupAlert(e.message);
    }

    setLoading(false);
  }
}
