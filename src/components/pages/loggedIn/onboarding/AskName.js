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

export default function AskName({ asEditPage }) {
  const { loggedInUser, setLoggedInUser } = useContext(Context);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(loggedInUser.name);
  }, [loggedInUser]);

  let title = "Please! type your full name";

  return (
    <OnboardingBoilerplate
      asEditPage={asEditPage}
      editPageTitle="Name"
      title={title}
      onSubmit={onSubmit}
      loading={loading}
    >
      <Container>
        <MaterialInput
          label={"Name"}
          value={name}
          onChange={extractEventValue(setName)}
        />
      </Container>
    </OnboardingBoilerplate>
  );

  async function onSubmit() {
    if (!name) return window.popupAlert("Please type the name");
    if (name.length < 4)
      return window.popupAlert("Name should be at least 4 letters");

    setLoading(true);

    try {
      await serverLine.patch("/me", {
        changes: { name },
      });
      setLoading(false);
      let newLoggedInUser = { ...loggedInUser, name };
      setLoggedInUser(newLoggedInUser);
      window.popupAlert("Saved");
    } catch (e) {
      window.popupAlert(e.message);
      setLoading(false);
    }
  }
}
