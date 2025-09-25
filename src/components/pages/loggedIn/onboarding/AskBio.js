import { useContext, useEffect, useState } from "react";

import OnboardingBoilerplate from "./OnboardingBoilerplate";
import extractEventValue from "../../../../controllers/utils/extractEventValue";
import MaterialInput from "../../../helperComponents/MaterialInput";
import styled from "styled-components";
import { serverLine } from "../../../../controllers/network/serverLine";
import Context from "../../../../Context";

const options = [
  { value: "MALE", label: "Mr" },
  { value: "FEMALE", label: "Mme" },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
  width: 100%;
`;

export default function AskBio({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);
  const [bio, setBio] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      setBio(loggedInUser.bio);
    }
  }, []);

  let title = "Please! tell us about yourself";

  return (
    <OnboardingBoilerplate
      editPageTitle="Bio"
      asEditPage={asEditPage}
      skipID={"bioOnboardingSkipped"}
      title={title}
      desc={"Like you purpose, background, motivation..."}
      onSubmit={onSubmit}
      loading={loading}
    >
      <Container>
        <MaterialInput
          multiline={true}
          rows={5}
          label={"Bio"}
          value={bio}
          onChange={extractEventValue(setBio)}
        />
      </Container>
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    if (!bio) return window.popupAlert("Please type the bio");
    if (bio.length < 20) return window.popupAlert("bio is too short");

    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { bio },
      });
      setLoading(false);
      let newLoggedInUser = { ...loggedInUser, bio };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
