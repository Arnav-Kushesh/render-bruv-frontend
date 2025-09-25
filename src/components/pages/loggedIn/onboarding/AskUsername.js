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

export default function AskUsername({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (loggedInUser) setUsername(loggedInUser.username);
  }, []);

  const [loading, setLoading] = useState(false);

  let title = "Your username";

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Username"
      title={title}
      desc={"You can change it later"}
      onSubmit={onSubmit}
      loading={loading}
    >
      <Container>
        <MaterialInput
          label={"Username"}
          value={username}
          onChange={extractEventValue(setUsername)}
        />
      </Container>
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    if (!username) return window.popupAlert("Username is required");
    if (username.length < 4)
      return window.popupAlert("username should be at least 4 letters");

    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { username },
      });
      setLoading(false);
      let newLoggedInUser = { ...loggedInUser, username };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
