import styled from "styled-components";
import { useEffect, useState } from "react";
import { serverLine } from "../../../../controllers/network/serverLine.js";
import LoggedInBoilerplate from "../LoggedInBoilerplate.js";
import LoadingSection from "../../../helperComponents/LoadingSection.js";
import getSubPath from "../../../../controllers/getSubPath.js";
import ContentCard from "../content/ContentCard.js";
import getUrlQuery from "../../../../controllers/getUrlQuery.js";
import ProfileCard from "../profiles/ProfileCard.js";
import CustomButton from "../../../helperComponents/CustomButton.js";
import MaterialInput from "../../../helperComponents/MaterialInput.js";
import DropDownInput from "../../../helperComponents/DropDownInput.js";

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
  gap: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 32vw;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const reasons = [
  { label: "Fraudulent Activity", value: "FRAUDULENT_ACTIVITY" },
  { label: "False Information", value: "FALSE_INFORMATION" },
  { label: "Misleading Story", value: "MISLEADING_STORY" },
  { label: "Fake or Stolen Images", value: "FAKE_OR_STOLEN_IMAGES" },
  { label: "Spam or Advertising", value: "SPAM_OR_ADVERTISING" },
  { label: "Harassment or Abuse", value: "HARASSMENT_OR_ABUSE" },
  { label: "Hate Speech", value: "HATE_SPEECH" },
  { label: "Inappropriate Content", value: "INAPPROPRIATE_CONTENT" },
  { label: "Duplicate Post", value: "DUPLICATE_POST" },
  { label: "Money Laundering Suspected", value: "MONEY_LAUNDERING_SUSPECTED" },
  { label: "Unverified Beneficiary", value: "UNVERIFIED_BENEFICIARY" },
  { label: "Other", value: "OTHER" },
];

export default function ReportItem({ onClick }) {
  const [item, setItem] = useState(null);
  const [itemId, setItemId] = useState(null);
  const [itemType, setItemType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState(null);
  const [note, setNote] = useState(null);

  useEffect(() => {
    let newitemId = getUrlQuery("itemId");
    let newItemType = getUrlQuery("itemType");
    setItemId(newitemId);
    setItemType(newItemType);
  }, []);

  useEffect(() => {
    if (itemId && itemType) loadItem();
  }, [itemId]);

  let core = null;
  let titleLine1 = "File Report";
  let titleLine2 = "Page";

  console.log("loading", item, itemId, itemType, getUrlQuery());

  if (loading) {
    core = <LoadingSection />;
  } else {
    if (itemType == "PROFILE") {
      core = <ProfileCard data={item} />;
    } else if (itemType == "CONTENT") {
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

        {!loading && (
          <InputContainer>
            <DropDownInput
              options={reasons}
              value={reason}
              onChange={setReason}
              label="Reason"
            />
            <MaterialInput
              value={note}
              onTextChange={setNote}
              label="Note"
              multiline={true}
              rows={4}
            />

            <CustomButton onClick={submitReport}>Submit</CustomButton>
          </InputContainer>
        )}
      </WideContainer>
    </LoggedInBoilerplate>
  );

  async function submitReport() {
    if (!reason) return window.popupAlert("Reason is required");
    setLoading(true);

    try {
      await serverLine.post(`/report`, { itemId, itemType, reason, note });
      window.popupAlert("Report has been submitted");
    } catch (e) {
      window.popupAlert(e.message);
    }

    setLoading(false);
  }

  async function loadItem() {
    setLoading(true);
    let data = null;

    if (itemType == "PROFILE") {
      data = await serverLine.get(`/profile/?itemId=${itemId}`);
    } else if (itemType == "CONTENT") {
      data = await serverLine.get(`/content/?itemId=${itemId}`);
    }

    setItem(data);
    setLoading(false);
  }
}
