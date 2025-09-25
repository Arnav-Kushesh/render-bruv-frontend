import styled from "styled-components";
import { useEffect, useState } from "react";
import { serverLine } from "../../../../controllers/network/serverLine.js";
import LoggedInBoilerplate from "../LoggedInBoilerplate.js";
import LoadingSection from "../../../helperComponents/LoadingSection.js";
import getSubPath from "../../../../controllers/getSubPath.js";
import ContentCard from "./ContentCard.js";
import MessageBox from "../../../helperComponents/MessageBox.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 38vw;

  @media (max-width: 900px) {
    width: 90vw;
  }
`;

const WideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  align-items: center;
`;

export default function ContentPage({ onClick }) {
  const [item, setItem] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let newitemId = getSubPath(1);
    setItemId(newitemId);
  }, []);

  useEffect(() => {
    if (itemId) loadItemToBeEdited();
  }, [itemId]);

  let core = null;
  let titleLine1 = "Post";
  let titleLine2 = "Page";

  if (loading) {
    core = <LoadingSection />;
  } else {
    if (!item) {
      core = <MessageBox>Item not found</MessageBox>;
    } else {
      core = <ContentCard data={item} />;
    }
  }

  return (
    <LoggedInBoilerplate
      showBackButton={true}
      titleLine1={titleLine1}
      titleLine2={titleLine2}
    >
      <WideContainer>
        <Container>{core}</Container>
      </WideContainer>
    </LoggedInBoilerplate>
  );

  async function loadItemToBeEdited() {
    try {
      setLoading(true);
      let data = await serverLine.get(`/content/?itemId=${itemId}`);
      setItem(data);
      setLoading(false);
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
