import { useContext, useState } from "react";

import OnboardingBoilerplate from "./OnboardingBoilerplate";
import styled from "styled-components";
import ImagePicker from "../../../editors/ImagePicker";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const Text = styled.div`
  font-size: 15px;
  opacity: 0.7;
`;
export default function AskProfileImage({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);
  const [value, setValue] = useState({ type: "DEFAULT", data: null });
  const [loading, setLoading] = useState(false);

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Profile Image"
      title={"Your photo"}
      desc={"Please upload an image"}
      onSubmit={onSubmit}
      loading={loading}
      skipID={"profileImageOnboardingSkipped"}
    >
      <UploadSection>
        <ImagePicker
          forPerson={true}
          value={value}
          onChange={setValue}
        ></ImagePicker>
      </UploadSection>
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    setLoading(true);

    try {
      await serverLine.patch("/me", { changes: { profileImage: value } });
      setLoading(false);

      let newLoggedInUser = { ...loggedInUser, profileImage: value };
      setLoggedInUser(newLoggedInUser);

      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
