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

export default function AskSignupSource({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const [signupSource, setSignupSource] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loggedInUser.signupSource) setSignupSource(loggedInUser.signupSource);
  }, [loggedInUser]);

  let title = "From where did you hear about Render Bruv?";

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Signup Source"
      title={title}
      onSubmit={onSubmit}
      loading={loading}
      disableSkip={true}
    >
      <Container>
        <MaterialInput
          multiline={true}
          label={"In two to three words"}
          value={signupSource}
          rows={3}
          onChange={extractEventValue(setSignupSource)}
        />
      </Container>
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    if (!signupSource) return window.popupAlert("Please type at lest 2 words");
    if (signupSource.length < 4)
      return window.popupAlert("Please type at lest 2 words");

    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { signupSource },
      });
      setLoading(false);
      let newLoggedInUser = { ...loggedInUser, signupSource };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
